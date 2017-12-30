import MainLoop from 'mainloop.js';

import Player from './player.js';
import Input from './input.js';
import Collision from './collision.js';
import Render from './render.js';


export class Zatacka {
	constructor(props){
		this.width = props.width;
		this.height = props.height;
		this.speed = 150;
		this.turnSpeed = 5;
		this.leakTime = 2000;
		this.leakDuration = 150;

		this.input = new Input();
		this.ready = false;
		this.running = false;

		this.players = [
			new Player({
				color: {
					r: 255,
					g: 0,
					b: 0
				},
				left: 81,
				right: 87,
				width: this.width,
				height: this.height
			}),
			new Player({
				color: {
					r: 0,
					g: 0,
					b: 255
				},
				left: 37,
				right: 39,
				width: this.width,
				height: this.height
			})
		];

		this.onStop = props.onStop;
	}


	start(){
		//set up canvas
		this.canvas = document.getElementById("zatacka");
		this.canvas.focus();
		this.ctx = this.canvas.getContext("2d");
		this.movementLines = [];

		this.renderer = new Render({
			width: this.width,
			height: this.height,
			ctx: this.ctx
		});

		this.collision = new Collision({
			width: this.width,
			height: this.height
		});


		this.players.forEach((player) => {
			player.reset();
		});

		this.relativeLeakTime = 0;

		//set mainloop and start it
		MainLoop.setUpdate((delta) => {
			this.update(delta);
		})

		MainLoop.setDraw(() => {
			this.draw();
		})

		this.ready = true;
		this.resume();
	}

	update(delta){
		var playersAlive = 0;

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

			var newLines = this.collision.commitMovements();
			this.movementLines = this.movementLines.concat(newLines);

			newLines.forEach((line) => {
				//a bit dirty: consider multiple lines per player...
				line.player.position = line.to;
			})

			if(player.alive)
				playersAlive++;
		});

		if(playersAlive <= 1)
			this.stop();
	}

	draw(){
		this.renderer.draw(this.movementLines);
		this.movementLines = [];
	}

	stop(){
		MainLoop.stop();

		this.players.forEach((player) => {
			if(player.alive)
				player.wins++;
		});

		this.running = false;
		this.ready = false;

		if(typeof this.onStop === 'function')
			this.onStop();
	}

	pause(){
		MainLoop.stop();

		this.running = false;
	}

	resume(){
		if(!this.running)
			MainLoop.start();

		this.running = true;
	}

	hitSpace(){
		if(this.running){
			this.pause();
			return;
		}
		if(!this.running){
			if(this.ready){
				this.resume();
				return;
			}
			if(!this.ready){
				this.start();
				return;
			}
		}
	}

}