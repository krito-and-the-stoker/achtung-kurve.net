import React, { Component } from 'react';
import Playback from '../game/playback.js';
import './start.css';
import store, { goConfig } from '../store.js';


import Kurve1 from '../data/kurve1.json';
import Kurve2 from '../data/kurve2.json';
import Kurve3 from '../data/kurve3.json';
import Kurve4 from '../data/kurve4.json';
import Kurve5 from '../data/kurve5.json';
import Kurve6 from '../data/kurve6.json';
import Kurve7 from '../data/kurve7.json';
import Kurve8 from '../data/kurve8.json';
import Kurve9 from '../data/kurve9.json';
import Kurve10 from '../data/kurve10.json';
import Kurve11 from '../data/kurve11.json';
import Kurve12 from '../data/kurve12.json';
import Kurve13 from '../data/kurve13.json';
import Kurve14 from '../data/kurve14.json';
import Kurve15 from '../data/kurve15.json';
import Kurve16 from '../data/kurve16.json';
import Kurve17 from '../data/kurve17.json';
import Kurve18 from '../data/kurve18.json';
import Kurve19 from '../data/kurve19.json';
import Kurve20 from '../data/kurve20.json';
import Kurve21 from '../data/kurve21.json';
import Kurve22 from '../data/kurve22.json';
import Kurve23 from '../data/kurve23.json';




export default class StartScreen extends Component {

	constructor(props){
		super(props);

		this.playback = new Playback({
			id: 'playback',
			onFinished: () => {this.startNextGame();}
		});

		this.games = [
			Kurve1,
			Kurve2,
			Kurve3,
			Kurve4,
			Kurve5,
			Kurve6,
			Kurve7,
			Kurve8,
			Kurve9,
			Kurve10,
			Kurve11,
			Kurve12,
			Kurve13,
			Kurve14,
			Kurve15,
			Kurve16,
			Kurve17,
			Kurve18,
			Kurve19,
			Kurve20,
			Kurve21,
			Kurve22,
			Kurve23,
		];

		this.currentGame = 0;
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
		this.playback.start(this.games[this.currentGame]);
		this.currentGame++;
		if(this.currentGame >= this.games.length)
			this.currentGame = 0;
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
