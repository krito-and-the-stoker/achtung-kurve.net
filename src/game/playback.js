import MainLoop from 'mainloop.js';

import Renderer from './renderer.js';
import Line from './line.js';

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
		this.steps = [];
		data.steps.forEach((step) => {
			var lines = [];
			step.forEach((line) => {
				lines.push(new Line({
					from: line.from,
					to: line.to,
					player: line.player
				}));
			});
			this.steps.push(lines);
		});

		this.steps.push(null);

		this.width = data.width;
		this.height = data.height;
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

			this.running = true;
			MainLoop.start();
		}
	}

	next(){
		if(this.currentStep < this.steps.length){
			this.currentStep++;
			return this.steps[this.currentStep];
		}

		return null;
	}

	rewind(){
		this.currentStep = 0;
	}

	stop(){
		if(this.running){
			MainLoop.stop();
		}

		this.running = false;
	}

	draw(){
		var lines = this.next();
		if(lines === null){
			this.stop();
			if(typeof this.onFinished === 'function')
				this.onFinished();
		}
		else{
			if(lines.length > 0){
				this.renderer.draw(lines);
			}
		}
	}

}