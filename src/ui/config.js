import React, { Component } from 'react';
import './config.css';
import store, {startGame, goToStartScreen, START} from '../store.js';

export default class ConfigScreen extends Component {

	constructor(props){
		super(props);

		this.state = {
			activePlayers: [],
		}

		store.subscribe(() => {
			var state = store.getState();
			if(state.screen === START){
				this.setState({
					...state,
					activePlayers: []
				});
				this.props.zatacka.players.forEach((player => {
					player.active = false;
				}));
			}
		})
	}

	handleKeyPress(e){
		if(this.props.active){		
			const activePlayers = [];
			this.props.zatacka.players.forEach((player) => {
				if(player.left === e.keyCode || player.right === e.keyCode)
					player.active = !player.active;

				if(player.active)
					activePlayers.push(player);
			});

			this.setState({
				...this.state,
				activePlayers: activePlayers
			});

			if(e.keyCode === 32 && activePlayers.length > 0){
				store.dispatch(startGame());
			}

			if(e.keyCode === 27){
				store.dispatch(goToStartScreen());
			}
		}
	}

	componentDidMount(){
		document.body.addEventListener('keydown', (e) => {
			this.handleKeyPress(e);
		});
	}

	render(){
		if(this.props.active){		
			const activePlayerList = this.state.activePlayers.map((player) => {
				return <span key={player.color.r.toString()+player.color.g.toString()+player.color.b.toString()} className="circle" style={{backgroundColor:"rgb("+player.color.r+','+player.color.g+','+player.color.b}}></span>
			});
			var startMessage = activePlayerList.length === 0 ? '':<h1 className="blink">Hit Space to start</h1>;
			return (
				<div className="ConfigScreen">
					<a className="back button" onClick={(e) => store.dispatch(goToStartScreen())}>BACK</a>
					<h1 className="chooseYourColor">Choose your Color</h1>
					<p>Press one of the buttons of your color to enter the game</p>
					<img src="/kurve_tastatur.png" alt="keys"/>
					<div className="activePlayerList">{activePlayerList}</div>
					{startMessage}
				</div>
			);
		}
		else{
			return null;
		}
	}
}
