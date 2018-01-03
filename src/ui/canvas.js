import React, { Component } from 'react';


export default class Canvas extends Component {
	constructor(props){
		super(props);
		this.zatacka = props.zatacka;
	}

	handleKeyDown(e){
		e.preventDefault();
		if(e.keyCode === 32){
			this.zatacka.hitSpace();
		}
		else
			this.zatacka.input.keyDown(e.keyCode);
	}

	handleKeyUp(e){
		e.preventDefault();
		this.zatacka.input.keyUp(e.keyCode);
	}

	render() {
		 return (
			 <canvas onKeyDown={(e) => {this.handleKeyDown(e)}} onKeyUp={(e) => {this.handleKeyUp(e)}} tabIndex="0" id="zatacka">
			 </canvas>
		 )
	}
}

