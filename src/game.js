import React, { Component } from 'react';

import ConfigScreen from './ui/config.js';
import Canvas from './ui/canvas.js';
import Zatacka from './game/zatacka.js';

export default class Game extends Component {

	constructor(props){
		super(props);

		this.zatacka = new Zatacka();
	}


  render() {
    return (
      <div className="Game">
      	<ConfigScreen zatacka={this.zatacka}/>
      	<Canvas zatacka={this.zatacka} />
      </div>
    );
  }
}

