import React, { Component } from 'react';

import ConfigScreen from './ui/config.js';
import PauseScreen from './ui/pause.js';
import StartScreen from './ui/start.js';

import Canvas from './ui/canvas.js';
import Zatacka from './game/zatacka.js';

import store, {START, CONFIG, GAME} from './store.js';


export default class Game extends Component {

	constructor(props){
		super(props);

    this.state = store.getState();
    
		this.zatacka = new Zatacka({
      id: 'zatacka',
    });
	}

  componentDidMount(){
    store.subscribe(() => {
      this.setState(store.getState());
      // console.log(store.getState());
    });

  }


  render() {
    return (
      <div className="Game">
        <StartScreen active={this.state.screen === START} />
      	<ConfigScreen zatacka={this.zatacka} active={this.state.screen === CONFIG} />
        <PauseScreen zatacka={this.zatacka} active={this.state.paused} />
      	<Canvas zatacka={this.zatacka} active={this.state.screen === GAME} />
      </div>
    );
  }
}

