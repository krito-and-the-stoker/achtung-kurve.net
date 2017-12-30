


export default class Render {
	constructor(props){
		this.height = props.height;
		this.width = props.width;
		this.ctx = props.ctx;

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
		// lines.forEach((line) => {
		// 	this.ctx.strokeStyle = 'rgb(' + line.color.r + ',' + line.color.g + ',' + line.color.b + ')';
		// 	this.ctx.beginPath();
		// 	this.ctx.moveTo(line.ifrom.x, line.ifrom.y);
		// 	this.ctx.lineTo(line.ito.x, line.ito.y);
		// 	this.ctx.stroke();
		// });
	}
}