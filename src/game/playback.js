import MainLoop from 'mainloop.js';

import Renderer from './renderer.js';
import Line from './line.js';
import store, { START } from '../store.js';

export default class Playback{

	constructor(props){
		this.id = props.id;
		this.data = props.data;
		this.onFinished = props.onFinished;
		this.running = false;

		this.rewind();
	}

	prepareData(data){
		//convert steps to drawable lines
		this.players = data.players;
		this.steps = [];
		data.steps.forEach((step) => {
			var lines = [];
			step.lines.forEach((line) => {
				lines.push(new Line({
					from: line.from,
					to: line.to,
					player: this.players[line.playerId]
				}));
			});
			this.steps.push({
				lines: lines,
				time: step.time
			});
		});

		this.steps.push({});

		this.width = data.width;
		this.height = data.height;

		store.subscribe(() => {
			var state = store.getState();
			if(state.screen !== START){
				this.stop();
			}
		})
	}

	start(data){
		if(!this.running){
			this.prepareData(data);
			this.renderer = new Renderer({
				canvas: document.getElementById(this.id)
			});

			this.renderer.setDimensions({
				width: this.width,
				height: this.height
			});

			this.rewind();

			MainLoop.setDraw(() => {
				this.draw()
			});

			MainLoop.setUpdate((delta) => {
				this.update(delta);
			});

			this.running = true;
			MainLoop.start();
		}
	}


	rewind(){
		this.currentTime = 0;
		this.currentStep = 0;
		this.drawQueue = [];
	}

	stop(){
		if(this.running){
			MainLoop.stop();
		}

		this.running = false;
	}

	update(delta){
		this.currentTime += delta;
		while(this.currentTime > this.steps[this.currentStep].time){
			this.drawQueue = this.drawQueue.concat(this.steps[this.currentStep].lines);
			this.currentStep++;
			if(this.currentStep >= this.steps.length){
				this.stop();
				if(typeof this.onFinished === 'function')
					this.onFinished();
			}
		}
		if(typeof this.steps[this.currentStep].time === 'undefined'){
			this.stop();
			if(typeof this.onFinished === 'function')
				this.onFinished();
		}
	}

	draw(){
		var lines = this.drawQueue;
		if(lines.length > 0){
			this.renderer.draw(lines);
		}
		this.drawQueue = [];
	}

}