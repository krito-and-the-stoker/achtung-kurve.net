import React, { Component } from 'react';
import store, { goToStartScreen } from '../store.js';

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
			const singlePlayer = this.state.players.filter(player => player.active).length === 1
			const gameOver = this.state.players.filter(player => player.alive).length <= (singlePlayer ? 0 : 1)
			const players = this.state.players
				.filter(player => player.active)
				.map((player) => {
					const key = player.color.r.toString()+player.color.g.toString()+player.color.b.toString()
					const playerColor = `rgb(${player.color.r}, ${player.color.g}, ${player.color.b})`
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
			let message;
			let winnerMessage;
			if (gameOver) {
				message = (
					<div className="continue">
						<h3 className="blink">Hit Space to play next game</h3>
					</div>
				)
				if (!singlePlayer) {				
					const winners = this.state.players
						.filter(player => player.alive)
					if (winners.length > 0) {
						const winner = winners[0]					
						const winnerColor = `rgb(${winner.color.r}, ${winner.color.g}, ${winner.color.b})`
						const style = {
							color: winnerColor
						}
						winnerMessage = (
							<h1 style={style}>{winner.name} wins</h1>
						)
					} else {
						const style = {
							color: 'white'
						}
						winnerMessage = (
							<h1 style={style}>Tie</h1>
						)
					}
				}
			} else {
				message = (
					<div className="continue">
						<h2 className="paused">Game Paused</h2>
						<h3 className="blink">Hit Space to resume</h3>
					</div>
				)
			}
			return (
				<div className="PauseScreen">
					<a className="back" onClick={(e) => store.dispatch(goToStartScreen())}>END GAME (ESC)</a>
					{winnerMessage}
					<ul>{players}</ul>
					{message}
				</div>
			);
		}
	}
}


