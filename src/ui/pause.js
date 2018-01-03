import React, { Component } from 'react';

import './pause.css';

export default class PauseScreen extends Component {
	constructor(props){
		super(props);
		this.state = {
			players: props.zatacka.players,
		}
	}

	render(){
		if(!this.props.show){
			return null;
		}
		else{		
			const players = this.state.players.map((player) => {
				if(player.active)
					return <li key={player.color.r.toString()+player.color.g.toString()+player.color.b.toString()} style={{color:"rgb("+player.color.r+','+player.color.g+','+player.color.b}}>{player.wins}</li>
				else
					return null;
			});
			return (
				<div className="PauseScreen">
					<ul>{players}</ul>
				</div>
			);
		}
	}
}


