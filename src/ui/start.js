import React, { Component } from 'react';
import Playback from '../game/playback.js';
import './start.css';
import store, { goConfig } from '../store.js';


import game18 from '../data/game-28.json';
import game19 from '../data/game-39.json';
import game20 from '../data/game-30.json';
import game21 from '../data/game-31.json';
import game22 from '../data/game-32.json';
import game23 from '../data/game-33.json';
import game24 from '../data/game-34.json';
import game25 from '../data/game-35.json';



export default class StartScreen extends Component {

	constructor(props){
		super(props);

		this.playback = new Playback({
			id: 'playback',
			onFinished: () => {this.startNextGame();}
		});

		this.games = [
			game18,
			game19,
			game20,
			game21,
			game22,
			game23,
			game24,
			game25,
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
