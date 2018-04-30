import io from 'socket.io-client'

const gameServer = 'http://localhost:3005';

class ZatackaClient {
	constructor(props) {
		this.socket = io(gameServer);

		this.id = props.id;

		this.renderer = new Renderer({
			canvas: document.getElementById(this.id)
		});

		this.width = this.renderer.width;
		this.height = this.renderer.height;

		MainLoop.setDraw(() => {
			this.draw();
		});
	}
}