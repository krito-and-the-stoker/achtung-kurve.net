import React, { Component } from 'react';

import ConfigScreen from './ui/config';
import PauseScreen from './ui/pause';
import StartScreen from './ui/start';

import Canvas from './ui/canvas';
import Zatacka from './game/zatacka';

import store, {START, CONFIG, GAME} from './store';


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
    });
  }


  render() {
    return (
      <div className="Game">
        <StartScreen active={this.state.screen === START} />
      	<ConfigScreen zatacka={this.zatacka} active={this.state.screen === CONFIG} />
        <PauseScreen zatacka={this.zatacka} active={this.state.paused && this.state.screen === GAME} />
      	<Canvas zatacka={this.zatacka} active={this.state.screen === GAME} />
      </div>
    );
  }
}

