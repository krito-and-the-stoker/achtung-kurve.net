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
		if(!this.props.active){
			return null;
		}
		else{		
			const players = this.state.players
				.filter(player => player.active)
				.map((player) => {
					const key = player.color.r.toString()+player.color.g.toString()+player.color.b.toString()
					const playerColor = "rgb("+player.color.r+','+player.color.g+','+player.color.b
					const liStyle = {
						color: playerColor
					}
					const numberStyle = {
						border: player.alive ? `1px solid ${playerColor}` : null
					}

					return (
						<li key={key} style={liStyle}>
						<p className="wins" style={numberStyle}>{player.wins}</p>
						<p className="keys">{player.keyNames.left} {player.keyNames.right}</p>
						<p>{player.alive}</p>
						</li>)
				});
			return (
				<div className="PauseScreen">
					<ul>{players}</ul>
				</div>
			);
		}
	}
}


