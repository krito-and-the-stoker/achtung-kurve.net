
export default class Line{
	constructor(props){
		this.from = props.from;
		this.to = props.to;
		this.player = props.player;
		this.thickness = 2;

		this.delta = null;
		this.points = null;
	}

	distance(point){
		return Math.abs(-this.delta.y*(point.x-this.from.x) + this.delta.x*(point.y-this.from.y));
	}

	rasterize(){
		if(this.points === null){		
			var leftbottom = {
				x: Math.floor(Math.min(this.from.x, this.to.x) - 0.5*this.thickness),
				y: Math.floor(Math.min(this.from.y, this.to.y) - 0.5*this.thickness)
			};

			var topright = {
				x: Math.ceil(Math.max(this.from.x, this.to.x) + 0.5*this.thickness),
				y: Math.ceil(Math.max(this.from.y, this.to.y) + 0.5*this.thickness)
			}

			if(this.delta === null){		
				this.delta = {
					x: this.to.x - this.from.x,
					y: this.to.y - this.from.y
				};
				var length = Math.sqrt(this.delta.x*this.delta.x + this.delta.y*this.delta.y);
				this.delta.x /= length;
				this.delta.y /= length;
			}

			this.points = [];
			for(var x = leftbottom.x; x <= topright.x; x++){
				for(var y = leftbottom.y; y <= topright.y; y++){
					var point = {
						x: x,
						y: y
					};
					point.d = this.distance(point);
					if( point.d <= 0.5*this.thickness){
						this.points.push(point);
					}
				}
			}
		}

		return this.points;
	}

	get color(){
		return this.player.color;
	}

	get ifrom(){
		return {
			x: Math.round(this.from.x),
			y: Math.round(this.from.y)
		}
	}

	get ito(){
		return {
			x: Math.round(this.to.x),
			y: Math.round(this.to.y)
		}
	}

	intersect(other){
		var result = 
			((other.from.x - this.from.x)*(other.to.x - this.to.x) <= 0) &&
			((other.from.y - this.from.y)*(other.to.y - this.to.y) <= 0);

		return result;
	}
}