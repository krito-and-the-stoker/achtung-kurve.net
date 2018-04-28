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

		this.state = {
			showImprint: false
		};
	}

	componentDidMount(){
		if(this.props.active)
			this.startNextGame();

		const ignoredKeys = ['Meta', 'Alt', 'Control', 'Shift', 'CapsLock']
		document.body.addEventListener('keydown', (e) => {
			if (!ignoredKeys.includes(e.key) && this.props.active) {
				store.dispatch(goConfig());
			}
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
		if(this.props.active){		
			this.currentGame = Math.floor(Math.random()*this.games.length);
			this.playback.start(this.games[this.currentGame]);
		}
	}

	toggleImprint(e){
		e.preventDefault();
		this.setState({
			...this.state,
			showImprint: !this.state.showImprint
		});
	}

	render(){
		if(this.props.active){
			let imprint = null;
			if(this.state.showImprint){
				imprint = (
						<div className="imprint">
							<div className="container">
								<a className="close" onClick={(e) => this.toggleImprint(e)}>x</a>
								<h3>Impressum</h3>
								<p>Seitenbetreiber</p>
								<p>Christoph Franke</p>
								<p>Reuterstraße 38</p>
								<p>12047 Berlin</p>
								<p><a href="mailto:hallo@christophfranke.info">hallo@christophfranke.info</a></p>
							</div>
						</div>
					);
			}
			return (
				<div className="StartScreen">
					<canvas id="playback"></canvas>
					<h1>Achtung&nbsp;Kurve</h1>
					<h2 className="blink" onClick={(e) => store.dispatch(goConfig())}>Press any key to play</h2>
					<a className="menu-item" href="/impressum" onClick={(e) => this.toggleImprint(e)}>Impressum</a>
					{imprint}
				</div>
			);
		}
		else{
			return null;
		}
	}
}
