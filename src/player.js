

export class Player {
	constructor(props){
		this.width = props.width;
		this.height = props.height;
		this.color = props.color;
		this.direction = 2*Math.PI*Math.random();
		this.position = {
			x: Math.floor(props.width*Math.random()),
			y: Math.floor(props.height*Math.random())
		};
		this.left = props.left;
		this.right = props.right;
		this.alive = true;
		this.wins = 0;
	}

	reset(){
		this.alive = true;
		this.position = {
			x: Math.floor(this.width*Math.random()),
			y: Math.floor(this.height*Math.random())
		};
	}
}