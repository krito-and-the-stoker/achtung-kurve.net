

export class PixelDrawer{

	constructor(props){
		this.height = props.height;
		this.width = props.width;
		this.ctx = props.ctx;

		this.ctx.fillStyle = '#000000';
		this.ctx.fillRect(0, 0, this.width,this.height);

		this.imageData = this.ctx.getImageData(0, 0, this.width, this.height);

		this.freshColors = {};
		this.dryColors = {};
	}

	static distance(from, to){
		return Math.sqrt((to.y - from.y)*(to.y - from.y) + (to.x - from.x)*(to.x - from.x));
	}

	setPixel(x, y, color){
		const threshold = 0.3;
		const point = {
			x: x,
			y: y
		};

		var ok = true;

		var intensity = 0.70710678118*PixelDrawer.distance(point, {
			x: Math.floor(point.x),
			y: Math.floor(point.y)
		});
		if(intensity > threshold)
			ok = ok && this.drawPixel(Math.floor(x), Math.floor(y), color.r, color.g, color.b, 255);

		intensity = 0.70710678118*PixelDrawer.distance(point, {
			x: Math.ceil(point.x),
			y: Math.floor(point.y)
		});
		if(intensity > threshold)
			ok = ok && this.drawPixel(Math.ceil(x), Math.floor(y), color.r, color.g, color.b, 255);

		intensity = 0.70710678118*PixelDrawer.distance(point, {
			x: Math.floor(point.x),
			y: Math.ceil(point.y)
		});
		if(intensity > threshold)
			ok = ok && this.drawPixel(Math.floor(x), Math.ceil(y), color.r, color.g, color.b, 255);

		intensity = 0.70710678118*PixelDrawer.distance(point, {
			x: Math.ceil(point.x),
			y: Math.ceil(point.y)
		});
		if(intensity > threshold)
			ok = ok && this.drawPixel(Math.ceil(x), Math.ceil(y), color.r, color.g, color.b, 255);

		return ok;
	}

	drawPixel(x, y, r, g, b, a) {
	    var index = (x + y * this.imageData.width) * 4;
	    var colorCode = (r << 4) + (g << 2) + b;
	    if(this.imageData.data[index] === 0 && this.imageData.data[index+1] === 0 && this.imageData.data[index+2] === 0){    	
		    this.imageData.data[index+0] = r;
		    this.imageData.data[index+1] = g;
		    this.imageData.data[index+2] = b;
		    this.imageData.data[index+3] = a;

		    this.freshColors[index] = colorCode;
		    return true;
	    }
	    else{
	    	return this.freshColors[index] === colorCode || this.dryColors[index] === colorCode;
	    }
	}

	update(){
		this.dryColors = this.freshColors;
		this.freshColors = {};
	}

}