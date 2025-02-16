import { createRoot } from 'react-dom/client'
import Game from './game';
import track from './track';

import './index.css';

track('VISIT')

createRoot(document.getElementById('root')).render(
  <Game />
)
