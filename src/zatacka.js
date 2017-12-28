import MainLoop from 'mainloop.js';
import bresenham from 'bresenham';

import {Player} from './player.js';
import {Input} from './input.js';
import {PixelDrawer} from './pixel-drawer.js';


export class Zatacka {
	constructor(props){
		this.width = props.width;
		this.height = props.height;
		this.speed = 150;
		this.turnSpeed = 5;
		this.leakTime = 2000;
		this.leakDuration = 100;

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
		this.pixel = new PixelDrawer({
			ctx: this.ctx,
			height: this.height,
			width: this.width
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
		this.pixel.update();
		this.relativeLeakTime += delta;
		var leakNow = false;
		if(this.relativeLeakTime > this.leakTime){
			leakNow = true;
		}
		if(this.relativeLeakTime > this.leakTime + this.leakDuration){
			leakNow = false;
			this.relativeLeakTime -= this.leakTime + this.leakDuration;
		}
		this.players.forEach((player) => {

			if(player.alive){

				// die on the edge
				if(player.position.x >= this.width)
					player.alive = false
				if(player.position.x < 0)
					player.alive = false
				if(player.position.y >= this.height)
					player.alive = false
				if(player.position.y < 0)
					player.alive = false

				// turn left/right
				if(this.input.isPressed(player.left)){
					player.direction += 0.001*delta*this.turnSpeed;
				}
				if(this.input.isPressed(player.right)){
					player.direction -= 0.001*delta*this.turnSpeed;
				}

				// get line start and end points
				var from = {
					x: player.position.x,
					y: player.position.y
				};
				var to = {
					x: from.x + 0.001*delta*this.speed * Math.sin(player.direction),
					y: from.y + 0.001*delta*this.speed * Math.cos(player.direction)
				};
				player.line = bresenham(from.x, from.y, to.x, to.y);

				// move player
				for(var i=0; i < player.line.length; i++){
					if(player.alive && !leakNow){
						player.alive = this.pixel.setPixel(player.line[i].x, player.line[i].y, player.color);
					}
				}
				player.position = to;
			}

			if(player.alive)
				playersAlive++;
		});

		if(playersAlive <= 1)
			this.stop();
	}

	draw(){
		this.ctx.putImageData(this.pixel.imageData, 0,0);
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