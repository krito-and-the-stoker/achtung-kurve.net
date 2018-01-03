

export default class Player {
	constructor(props){
		this.color = props.color;
		this.left = props.left;
		this.right = props.right;
		this.active = false;
		this.wins = 0;
	}

	reset(){
		this.alive = this.active;
		this.direction = 2*Math.PI*Math.random();
		this.position = {
			x: Math.floor(this.width*Math.random()),
			y: Math.floor(this.height*Math.random())
		};
	}

	set dimensions(props){
		this.width = props.width;
		this.height = props.height;
	}

	get dimensions(){
		return {
			width: this.width,
			height: this.height
		}
	}

	//create all players with default settings
	static createAll(props){
		return [
		//red: 1q
			new Player({
				color: {
					r: 255,
					g: 0,
					b: 0
				},
				left: 49,
				right: 81,
			}),
		//cyan: xc
			new Player({
				color: {
					r: 0,
					g: 255,
					b: 255
				},
				left: 88,
				right: 67,
			}),
		//yellow: bn
			new Player({
				color: {
					r: 255,
					g: 255,
					b: 0
				},
				left: 66,
				right: 78,
			}),
		//purple: p0
			new Player({
				color: {
					r: 255,
					g: 0,
					b: 255
				},
				left: 48,
				right: 80,
			}),
		//green: <-,->
			new Player({
				color: {
					r: 0,
					g: 255,
					b: 0
				},
				left: 37,
				right: 39,
			}),
		//white: mk
			new Player({
				color: {
					r: 255,
					g: 255,
					b: 255
				},
				left: 77,
				right: 75,
			})
		];		
	}
}