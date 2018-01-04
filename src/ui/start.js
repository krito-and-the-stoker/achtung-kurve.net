import React, { Component } from 'react';
import Playback from '../game/playback.js';
import './start.css';
import store, { goConfig } from '../store.js';


import game35 from '../data/game-35.json';
import game53 from '../data/game-53.json';
import game66 from '../data/game-66.json';
import game20 from '../data/game-20.json';



export default class StartScreen extends Component {

	constructor(props){
		super(props);

		this.playback = new Playback({
			id: 'playback',
			onFinished: () => {this.startNextGame();}
		});

		this.games = [
			game35,
			game53,
			game66,
			game20
		];
	}

	componentDidMount(){
		if(this.props.active)
			this.startNextGame();

		document.body.addEventListener('keydown', () => {
			if(this.props.active)
				store.dispatch(goConfig());
		});
	}

	componentDidUpdate(){
		if(this.props.active)
			this.startNextGame();
		else{
			this.playback.stop();
		}
	}

	startNextGame(){
		this.currentGame = Math.floor(Math.random()*this.games.length);
		this.playback.start(this.games[this.currentGame]);
	}

	render(){
		if(this.props.active){		
			return (
				<div className="StartScreen">
					<canvas id="playback"></canvas>
					<h1>Achtung&nbsp;Kurve</h1>
					<h2 className="blink">Press any key to play</h2>
				</div>
			);
		}
		else{
			return null;
		}
	}
}
