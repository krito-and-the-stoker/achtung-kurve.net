


export default class Render {
	constructor(props){

		//set up canvas
		this.canvas = props.canvas;
		this.canvas.focus();

		this.ctx = this.canvas.getContext("2d");

		//get viewport
		this.width = this.canvas.clientWidth;
		this.height = this.canvas.clientHeight;

		//set internal pixels to match viewport
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		this.ctx.fillStyle = '#000000';
		this.ctx.fillRect(0, 0, this.width,this.height);
	}

	draw(lines){
		lines.forEach((line) => {
			this.ctx.fillStyle = 'rgb(' + line.color.r + ',' + line.color.g + ',' + line.color.b + ')';
			var points = line.rasterize();
			points.forEach((point) => {
				this.ctx.fillRect(point.x, point.y, 1, 1);
			});
		});
	}
}