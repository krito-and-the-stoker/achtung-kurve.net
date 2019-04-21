import MainLoop from 'mainloop.js';

import Player from './player.js';
import Input from './input.js';
import Collision from './collision.js';
import Renderer from './renderer.js';
import Recorder from './recorder.js';


export default class Zatacka {
	constructor(props){
		this.speed = 150;
		this.turnSpeed = 4;
		this.leakTime = 2000;
		this.leakDuration = 150;
		this.gameCounter = 0;

		this.input = new Input();
		this.ready = false;
		this._running = false;

		this.players = Player.createAll();
	}

	set running(value){
		this._running = value;
	}

	get running(){
		return this._running;
	}

	start(){
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

		this.recorder = new Recorder({
			width: this.width,
			height: this.height,
			players: this.players,
			filename: 'game-' + this.gameCounter + '.json'
		});


		this.relativeLeakTime = 0;
		this.turnsLeft = 10;

		//set mainloop and start it
		MainLoop.setUpdate((delta) => {
			this.update(delta);
		});

		this.ready = true;
		this.resume();
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

		var newLines = this.collision.commitMovements();
		this.movementLines = this.movementLines.concat(newLines);
		this.recorder.record(newLines, this.currentTime);

		newLines.forEach((line) => {
			//a bit dirty: consider multiple lines per player...
			line.player.position = line.to;
		});

		this.players.forEach((player) => {
			if(player.alive)
				playersAlive++;
		});


		if(playersAlive <= 1 && playersAlive < this.playersActive)
			this.turnsLeft--;

		if(this.turnsLeft === 0) {
			this.stop();
			// Tracking.game(this.players
			// 	.filter(player => player.active)
			// 	.map(player => ({
			// 		name: player.name,
			// 		wins: player.wins
			// 	})), {
			// 		duration: Math.round(this.currentTime),
			// 	}
			// );
		}

		this.server.push(this.movemntLines);
		this.movementLines = [];
	}

	stop(){
		if(this.running){		
			MainLoop.stop();

			this.players.forEach((player) => {
				if(player.alive)
					player.wins++;
			});

			this.recorder.export();

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

}