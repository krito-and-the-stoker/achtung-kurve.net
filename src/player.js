

export class Player {
	constructor(props){
		this.color = props.color;
		this.direction = 2*Math.PI*Math.random();
		this.position = {
			x: Math.floor(props.width*Math.random()),
			y: Math.floor(props.height*Math.random())
		};
	}
}