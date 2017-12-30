
import Line from './line.js';


export default class Collision {

	constructor(props){
		this.width = props.width;
		this.height = props.height;

		this.lines = [];
		this.collisionData = Array(this.width*this.height).fill(null);

		this.internalTime = 0;
	}


	positionValid(position){
		if(position.x >= this.width)
			return false
		if(position.x < 0)
			return false
		if(position.y >= this.height)
			return false
		if(position.y < 0)
			return false

		return true;
	}

	tryToMove(player, to){
		this.lines.push(new Line({
			from: player.position,
			to: to,
			player: player
		}));
	}

	commitMovements(){
		var approved = [];
		this.lines.forEach((line) => {

			//check with all existing pixels
			var points = line.rasterize();
			var lastValidPoint = points[0];
			points.forEach((point) => {
				if(!this.positionValid(point)){
					line.to = lastValidPoint;
					line.player.alive = false;
				}
				else{
					// console.log(point.x, point.y);
					var index = point.x + point.y * this.width;

					//no collision here
					if(this.collisionData[index] === null){
						this.collisionData[index] = {
							player: line.player,
							time: this.internalTime
						}
					}
					else{
						//collision with recently drawn pixel by us
						if(this.collisionData[index].player === line.player && this.collisionData[index].time >= this.internalTime - 10){
							// ignore
						}
						else{
							//we are dead
							line.player.alive = false;
							line.to = lastValidPoint; //stop here
						}
					}
				}

				lastValidPoint = point;
			});

			approved.push(line);
		});

		this.internalTime++;
		this.lines = [];

		return approved;
	}
}