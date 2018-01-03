import React, { Component } from 'react';

import ConfigScreen from './ui/config.js';
import PauseScreen from './ui/pause.js';
import Canvas from './ui/canvas.js';
import Zatacka from './game/zatacka.js';

export default class Game extends Component {

	constructor(props){
		super(props);

    this.state = {
      running: false,
      config: true,
      pause: false
    };

		this.zatacka = new Zatacka({
      onRunningStateChange: (v) => {this.onRunningStateChange(v);}
    });
	}

  onRunningStateChange(value){
    this.setState({
      ...this.state,
      running: value,
      config: false,
      pause: !value
    });
  }


  render() {
    return (
      <div className="Game">
      	<ConfigScreen zatacka={this.zatacka} show={this.state.config} />
        <PauseScreen zatacka={this.zatacka} show={this.state.pause} />
      	<Canvas zatacka={this.zatacka} />
      </div>
    );
  }
}

