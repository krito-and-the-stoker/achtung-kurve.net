import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game.js';
import Tracking from './tracking/index.js';
import Raven from 'raven-js';

import './index.css';

Raven
    .config('https://5af48842d6d643d3bde7a59f2fe81b42@sentry.io/1198155')
    .install();

Raven.context(function () {
	ReactDOM.render(<Game />, document.getElementById('root'));
	Tracking.pageView('Home');
});
