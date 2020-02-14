import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game.js';
import Raven from 'raven-js';
import 'array.prototype.fill'
import 'array.prototype.includes'

import './index.css';

Raven
    .config(process.env.REACT_APP_RAVEN_ENDPOINT)
    .install();

Raven.context(function () {
	ReactDOM.render(<Game />, document.getElementById('root'));
});
