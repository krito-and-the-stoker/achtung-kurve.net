import React, { Component } from 'react';

// import ConfigScreen from './ui/config.jsx';
// import PauseScreen from './ui/pause.jsx';
// import StartScreen from './ui/start.jsx';
// import Canvas from './ui/canvas.jsx';

import Zatacka from '../../common/game/zatacka.js';

import store, {START, CONFIG, GAME} from './store.js';


export default class Game extends Component {
	constructor(props){
		super(props);

    this.state = store.getState();
		// this.zatacka = new Zatacka({
  //     id: 'zatacka',
  //   });
	}

  componentDidMount(){
    store.subscribe(() => {
      this.setState(store.getState());
    });
  }


  render() {
    return (
      <div className="Game">
{/*        <StartScreen active={this.state.screen === START} />
      	<ConfigScreen zatacka={this.zatacka} active={this.state.screen === CONFIG} />
        <PauseScreen zatacka={this.zatacka} active={this.state.paused && this.state.screen === GAME} />
      	<Canvas zatacka={this.zatacka} active={this.state.screen === GAME} />
*/}      </div>
    );
  }
}

