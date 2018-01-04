import React, { Component } from 'react';
import './canvas.css';


export default class Canvas extends Component {

	componentWillUpdate(){
		// if(!this.props.active){
		// 	this.props.zatacka.stop();
		// }
	}

	render() {
		return (
			<canvas id={this.props.zatacka.id}>
			</canvas>
		);
	}
}

