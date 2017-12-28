import MainLoop from 'mainloop.js';
import {Player} from './player.js';
import bresenham from 'bresenham';


export class Zatacka {
	constructor(props){
		this.width = props.width;
		this.height = props.height;
		this.speed = 150;
	}

	distance(from, to){
		return Math.sqrt((to.y - from.y)*(to.y - from.y) + (to.x - from.x)*(to.x - from.x));
	}

	setPixel(x, y, color){
		const threshold = 0.25;
		const point = {
			x: x,
			y: y
		};

		var intensity = 0.70710678118*this.distance(point, {
			x: Math.floor(point.x),
			y: Math.floor(point.y)
		});
		if(intensity > threshold)
			this.drawPixel(Math.floor(x), Math.floor(y), color.r, color.g, color.b, intensity);

		intensity = 0.70710678118*this.distance(point, {
			x: Math.ceil(point.x),
			y: Math.floor(point.y)
		});
		if(intensity > threshold)
			this.drawPixel(Math.ceil(x), Math.floor(y), color.r, color.g, color.b, intensity);

		intensity = 0.70710678118*this.distance(point, {
			x: Math.floor(point.x),
			y: Math.ceil(point.y)
		});
		if(intensity > threshold)
			this.drawPixel(Math.floor(x), Math.ceil(y), color.r, color.g, color.b, intensity);

		intensity = 0.70710678118*this.distance(point, {
			x: Math.ceil(point.x),
			y: Math.ceil(point.y)
		});
		if(intensity > threshold)
			this.drawPixel(Math.ceil(x), Math.ceil(y), color.r, color.g, color.b, intensity);
	}

	drawPixel(x, y, r, g, b, a) {
	    var index = (x + y * this.imageData.width) * 4;
	    this.imageData.data[index+0] = r;
	    this.imageData.data[index+1] = g;
	    this.imageData.data[index+2] = b;
	    // this.imageData.data[index+0] = Math.floor(r*a);
	    // this.imageData.data[index+1] = Math.floor(g*a);
	    // this.imageData.data[index+2] = Math.floor(b*a);
	    this.imageData.data[index+3] = 255;
	}

	start(){
		//set up canvas
		this.canvas = document.getElementById("zatacka");
		this.ctx = this.canvas.getContext("2d");
		this.ctx.fillStyle = '#000000';
		this.ctx.fillRect(0,0,this.width,this.height);
		this.imageData = this.ctx.getImageData(0, 0, this.width, this.height);

		this.players = [
			new Player({
				color: {
					r: 255,
					g: 0,
					b: 0
				},
				width: this.width,
				height: this.height
			})
		];

		//set mainloop and start it
		MainLoop.setUpdate((delta) => {
			this.update(delta);
		})

		MainLoop.setDraw(() => {
			this.draw();
		})

		MainLoop.start();
	}

	update(delta){
		console.log(delta);
		this.players.forEach((player) => {
			// get player back into bounds
			if(player.position.x >= this.width)
				player.position.x = 0;

			if(player.position.x < 0)
				player.position.x = this.width-1;

			if(player.position.y >= this.height)
				player.position.y = 0;

			if(player.position.y < 0)
				player.position.y = this.height-1;


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
			for(var i=0; i < player.line.length; i++){
				this.setPixel(player.line[i].x, player.line[i].y, player.color);
			}

			player.position = to;
		});
	}

	draw(){
		this.ctx.putImageData(this.imageData, 0,0);
	}

	stop(){
		MainLoop.stop();
	}
}