import MainLoop from 'mainloop.js';

import Player from './player'
import Input from './input'
import Collision from './collision'
import Renderer from './renderer'
import Connection from './connection'
import Line from './line'

import store, { pauseGame, startGame, goToStartScreen, GAME } from '../store'

export default class Zatacka {
	constructor(props){
		this.speed = 150
		this.turnSpeed = 4
		this.leakTime = 2000
		this.leakDuration = 150
		this.gameCounter = 0

		this.input = new Input()
		this.ready = false
		this._running = false

		this.id = props.id

		this.players = Player.createAll()
		Connection.initialize()

		//start automatically
		store.subscribe(() => {
			var state = store.getState()
			if(state.screen === GAME){
				if(!state.paused && !this.running)
					this.resume()
				if(state.paused && this.running)
					this.pause()
			}
		})

		document.body.addEventListener('keydown', (e) => {
			var state = store.getState()
			if(e.keyCode === 32){
				if(state.screen === GAME)
					this.hitSpace()
			}
			if(e.keyCode === 27){
				if(state.screen === GAME && state.paused === true){
					this.stop()
					this.renderer.clear()
					store.dispatch(goToStartScreen())
				}
			}
		})
	}

	set running(value){
		this._running = value;
		if(this._running === false){
			store.dispatch(pauseGame());
		}
	}

	get running(){
		return this._running;
	}

	start(){
		this.renderer = new Renderer({
			canvas: document.getElementById(this.id)
		});

		this.width = this.renderer.width;
		this.height = this.renderer.height;

		this.collision = new Collision({
			width: this.width,
			height: this.height
		});		

		this.movementLines = [];
		this.gameCounter++;
		this.currentTime = 0;

		this.playersActive = 0;
		this.players.forEach((player) => {
			player.dimensions = {
				width: this.width,
				height: this.height
			};
			player.reset();
			if(player.active)
				this.playersActive++;
		});

		Connection.start({
			width: this.width,
			height: this.height,
			players: this.players,
			stop: () => {
				console.log('game stopped')
				this.stop()
			},
			start: id => {
				this.id = id
				this.relativeLeakTime = 0
				this.turnsLeft = 10

				//set mainloop and start it
				MainLoop.setUpdate((delta) => {
					this.update(delta)
				})

				MainLoop.setDraw(() => {
					this.draw()
				})

				this.ready = true
				this.resume()
			},
			step: data => {
				if (data.id !== this.id && data.lines.length > 0) {
					const newLines = data.lines.map(line => new Line({
						from: line.from,
						to: line.to,
						player: this.players[line.playerId]
					}))
					this.movementLines = this.movementLines.concat(newLines)
				}
			}
		})


	}

	update(delta){
		var playersAlive = 0;

		this.currentTime += delta;
		this.relativeLeakTime += delta;
		var leakNow = false;
		if(this.relativeLeakTime > this.leakTime){
			leakNow = true;
		}
		if(this.relativeLeakTime > this.leakTime + this.leakDuration){
			leakNow = false;
			this.relativeLeakTime -= this.leakTime + this.leakDuration;
		}

		// turn left/right
		this.players.forEach((player) => {
			if(player.alive){			
				if(this.input.isPressed(player.left)){
					player.direction += 0.001*delta*this.turnSpeed;
				}
				if(this.input.isPressed(player.right)){
					player.direction -= 0.001*delta*this.turnSpeed;
				}
			}
		});

		this.players.forEach((player) => {

			if(player.alive){
				// die on the edge
				player.alive = this.collision.positionValid(player.position);

				// get line start and end points
				var to = {
					x: player.position.x + 0.001*delta*this.speed * Math.sin(player.direction),
					y: player.position.y + 0.001*delta*this.speed * Math.cos(player.direction)
				};

				if(leakNow)
					player.position = to;
				else
					this.collision.tryToMove(player, to);
			}

		});

		var newLines = this.collision.commitMovements()
		this.movementLines = this.movementLines.concat(newLines)
		Connection.step(newLines, this.currentTime)

		newLines.forEach((line) => {
			//a bit dirty: consider multiple lines per player...
			line.player.position = line.to;
		});

		this.players.forEach((player) => {
			if(player.alive)
				playersAlive++;
		});


		// if(playersAlive <= 1 && playersAlive < this.playersActive)
		// 	this.turnsLeft--;

		// if(this.turnsLeft === 0)
		// 	this.stop();
	}

	draw(){
		this.renderer.draw(this.movementLines)
		this.movementLines = []
	}

	stop(){
		if(this.running){		
			MainLoop.stop();

			this.players.forEach((player) => {
				if(player.alive)
					player.wins++;
			});

			Connection.stop()
		}

		this.running = false;
		this.ready = false;
	}

	pause(){
		MainLoop.stop();

		this.running = false;
	}

	resume(){
		if(!this.ready){
			this.start();
		}
		if(!this.running){
			MainLoop.start();
			this.running = true;
		}

	}

	hitSpace(){
		if(this.running){
			store.dispatch(pauseGame());
		}
		else{
			store.dispatch(startGame());
		}
	}

}