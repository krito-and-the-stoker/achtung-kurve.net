
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
			points.forEach((point) => {
				if(!this.positionValid(point) || !line.player.alive){
					line.player.alive = false;
				}
				else{
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
						if(this.collisionData[index].player === line.player && this.collisionData[index].time >= this.internalTime - 5*line.thickness){
							// ignore
						}
						else{
							//we are dead
							line.player.alive = false;
						}
					}
				}
			});

			approved.push(line);
		});

		this.internalTime++;
		this.lines = [];

		return approved;
	}
}