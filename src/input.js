



export default class Input{

	constructor(props){
		this.keyMap = {};
	}
	
	keyDown(keyCode){
		this.keyMap[keyCode] = true;
	}

	keyUp(keyCode){
		this.keyMap[keyCode] = false;
	}

	isPressed(keyCode){
		return this.keyMap[keyCode] === true;
	}
}