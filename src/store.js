import { createStore } from 'redux';


export const START = 0;
export const CONFIG = 1;
export const GAME = 2;


const initialState = {
	screen: START,
	paused: false
};


function handleUI(state = initialState, action){
	if(action.type === 'STARTGAME'){
		return {
			...state,
			screen: GAME,
			paused: false
		}
	}
	if(action.type === 'PAUSEGAME'){
		return {
			...state,
			paused: true
		}
	}
	if(action.type === 'GOCONFIG'){
		return {
			...state,
			screen: CONFIG
		}
	}
	return state;
}

export function startGame(){
	return {
		type: 'STARTGAME'
	};
}

export function pauseGame(){
	return {
		type: 'PAUSEGAME'
	}
}

export function goConfig(){
	return {
		type: 'GOCONFIG'
	}
}


var store = createStore(handleUI);

export default store;