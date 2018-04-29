import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game.js';
import Tracking from './tracking/index.js';

import './index.css';


ReactDOM.render(<Game />, document.getElementById('root'));
Tracking.pageView('Home');