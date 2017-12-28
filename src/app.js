import React, { Component } from 'react';
import {Zatacka} from './zatacka.js';
import keydown, {ALL_KEYS} from 'react-keydown';




class Canvas extends Component {
	constructor(props){
		super(props);
		this.state = {
			width: props.width,
			height: props.height
		}
	}

	@keydown()
	handle_input(event){
		console.log(event);
	}

	render() {
		 return (
			 <canvas width={this.state.width} height={this.state.height} id="zatacka">
			 </canvas>
		 )
	}
}



class App extends Component {

	constructor(props){
		super(props);
		this.state = {
			running: false,
			width: 800,
			height: 600
		}

		this.zatacka = new Zatacka({
			width: 800,
			height: 600
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
      	<Canvas width={this.state.width} height={this.state.height} />
      	{button}
      </div>
    );
  }
}

export default App;
