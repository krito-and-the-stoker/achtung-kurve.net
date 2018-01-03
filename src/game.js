import React, { Component } from 'react';
import {Zatacka} from './zatacka.js';


class Canvas extends Component {
	constructor(props){
		super(props);
		this.zatacka = props.zatacka;
		this.state = {
			width: props.width,
			height: props.height
		}
	}

	handleKeyDown(e){
		if(e.keyCode === 32){
			this.zatacka.hitSpace();
		}
		else
			this.zatacka.input.keyDown(e.keyCode);
	}

	handleKeyUp(e){
		this.zatacka.input.keyUp(e.keyCode);
	}

	render() {
		 return (
			 <canvas onKeyDown={(e) => {this.handleKeyDown(e)}} onKeyUp={(e) => {this.handleKeyUp(e)}} tabIndex="0" id="zatacka">
			 </canvas>
		 )
	}
}

class InfoBox extends Component {
	constructor(props){
		super(props);

		this.state = {
			players: props.players
		}
	}

	render(){
		const players = this.state.players.map((player) => {
			return <li key={player.color.r.toString()+player.color.g.toString()+player.color.b.toString()} style={{color:"rgb("+player.color.r+','+player.color.g+','+player.color.b}}>{player.wins}</li>
		});
		return (
			<ul>
			{players}
			</ul>
		);
	}
}



class Game extends Component {

	constructor(props){
		super(props);
		const width = 1400;
		const height = 800;

		this.zatacka = new Zatacka({
			width: width,
			height: height,
		});

		this.state = {
			running: false,
			width: width,
			height: height,
			players: this.zatacka.players
		}

	}


  render() {
    return (
      <div className="Game">
      	<Canvas width={this.state.width} height={this.state.height} zatacka={this.zatacka} />
      </div>
    );
  }
}

export default Game;