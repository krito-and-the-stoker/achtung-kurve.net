import React, { Component } from 'react';

export default class PauseScreen extends Component {
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


