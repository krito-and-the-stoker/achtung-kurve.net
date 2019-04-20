import React, { Component } from 'react';
import './canvas.css';


export default class Canvas extends Component {

	render() {
		return (
			<canvas id={this.props.zatacka.id}>
			</canvas>
		);
	}
}

