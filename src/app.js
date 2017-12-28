import React, { Component } from 'react';
import {Zatacka} from './zatacka.js';


class Canvas extends Component {
	constructor(props){
		super(props);
		this.zatacka = props.zatacka;
		this.state = {
			width: props.width,
			height: props.height
		}
	}

	handleKeyDown(e){
		if(e.keyCode === 32){
			this.zatacka.hitSpace();
		}
		else
			this.zatacka.input.keyDown(e.keyCode);
	}

	handleKeyUp(e){
		this.zatacka.input.keyUp(e.keyCode);
	}

	render() {
		 return (
			 <canvas width={this.state.width} height={this.state.height} onKeyDown={(e) => {this.handleKeyDown(e)}} onKeyUp={(e) => {this.handleKeyUp(e)}} tabIndex="0" id="zatacka">
			 </canvas>
		 )
	}
}

class InfoBox extends Component {
	constructor(props){
		super(props);

		this.state = {
			players: []
		}
	}
}



class App extends Component {

	constructor(props){
		super(props);
		const width = 1400;
		const height = 800;

		this.state = {
			running: false,
			width: width,
			height: height
		}

		this.zatacka = new Zatacka({
			width: width,
			height: height
		});
	}

	clickStart() {
		this.zatacka.start();
		this.setState({
			...this.state,
			running: true
		});
	}

	clickStop() {
		this.zatacka.stop();
		this.setState({
			...this.state,
			running: false
		});
	}

  render() {
  	let button;
  	if(this.state.running){
  		button = <button onClick={() => {this.clickStop()}}>Stop!</button>;
  	}
  	else{
  		button = <button onClick={() => {this.clickStart()}}>Start!</button>;
  	}
    return (
      <div className="App">
      	<Canvas width={this.state.width} height={this.state.height} zatacka={this.zatacka} />
      	{button}
      </div>
    );
  }
}

export default App;
