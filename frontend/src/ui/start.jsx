import React, { Component } from 'react';
import Playback from '../game/playback.js';
import './start.css';
import store, { goConfig } from '../store.js';
import gameData from '../data/index.js';



export default class StartScreen extends Component {
	constructor(props){
		super(props);

		this.playback = new Playback({
			id: 'playback',
			onFinished: () => {this.startNextGame()}
		});

    this.setBackdropRef = element => {
      this.backdrop = element;
    };

		this.state = {
			showImprint: false
		};

		// load first game
		this.nextGame = gameData[`game${Math.floor(Math.random()*Object.keys(gameData).length) + 18}`]();
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

	containerClick(e) {
		if (e.target === this.backdrop) {
			this.toggleImprint(e);
		}
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
			this.nextGame.then((game) => {
				this.playback.start(game);
			})
			// preload next game here
			const gameIndex = Math.floor(Math.random()*Object.keys(gameData).length) + 18;
			this.nextGame = gameData[`game${gameIndex}`]();
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
						<div className="imprint" onClick={(e) => this.containerClick(e)} ref={this.setBackdropRef}>
							<div className="container">
								<a className="close" onClick={(e) => this.toggleImprint(e)}>x</a>
								<h3>Impressum</h3>
								<p>Krito and the Stoker GbR</p>
								<p>Christoph Franke</p>
								<p>Fabian Kampa</p>
								<p>Vogelsanger Straße 138</p>
								<p>50825 K&ouml;ln</p>
								<p><a href="https://kritoandthestoker.de" target="_blank" rel="noopener noreferrer">kritoandthestoker.de</a></p>
								<p><a href="mailto:hallo@kritoandthestoker.de">hallo@kritoandthestoker.de</a></p>
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
