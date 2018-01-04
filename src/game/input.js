



export default class Input{

	constructor(props){
		this.keyMap = {};

		document.body.addEventListener('keydown', (e) => {
			this.keyDown(e.keyCode);
		});
		document.body.addEventListener('keyup', (e) => {
			this.keyUp(e.keyCode);
		});
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