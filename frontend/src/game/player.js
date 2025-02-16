

export default class Player {
	constructor(props){
		this.color = props.color;
		this.left = props.left;
		this.right = props.right;
		this.keyNames = props.keyNames;
		this.name = props.name;
		this.id = props.id;
		this.active = false;
		this.wins = 0;
	}

	reset(){
		this.alive = this.active;
		this.direction = 2*Math.PI*Math.random();
		this.position = {
			x: Math.floor(this.width*(0.1 + 0.8*Math.random())),
			y: Math.floor(this.height*(0.1 + 0.8*Math.random()))
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
	static createAll(){
		return [
		//red: 1q
			new Player({
				id: 0,
				color: {
					r: 255,
					g: 0,
					b: 0
				},
				left: 49,
				right: 81,
				keyNames: {
					left: '1',
					right: 'q',
				},
				name: 'Red',
			}),
		//cyan: xc
			new Player({
				id: 1,
				color: {
					r: 0,
					g: 255,
					b: 255
				},
				left: 88,
				right: 67,
				keyNames: {
					left: 'x',
					right: 'c',
				},
				name: 'Cyan',
			}),
		//yellow: bn
			new Player({
				id: 2,
				color: {
					r: 255,
					g: 255,
					b: 0,
				},
				left: 66,
				right: 78,
				keyNames: {
					left: 'b',
					right: 'n',
				},
				name: 'Yellow',
			}),
		//purple: p0
			new Player({
				id: 3,
				color: {
					r: 255,
					g: 0,
					b: 255
				},
				left: 80,
				right: 48,
				keyNames: {
					left: 'p',
					right: '0',
				},
				name: 'Purple',
			}),
		//green: <-,->
			new Player({
				id: 4,
				color: {
					r: 0,
					g: 255,
					b: 0
				},
				left: 37,
				right: 39,
				keyNames: {
					left: '<-',
					right: '->',
				},
				name: 'Green',
			}),
		//white: mk
			new Player({
				id: 5,
				color: {
					r: 255,
					g: 255,
					b: 255
				},
				left: 77,
				right: 75,
				keyNames: {
					left: 'm',
					right: 'k',
				},
				name: 'White',
			})
		];		
	}
}