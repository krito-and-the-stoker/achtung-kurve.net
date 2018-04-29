import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game.js';
import Tracking from './tracking/index.js';
import Raven from 'raven-js';

import './index.css';

Raven
    .config(process.env.raven)
    .install();

Raven.context(function () {
	ReactDOM.render(<Game />, document.getElementById('root'));
	Tracking.pageView('Home');
});
