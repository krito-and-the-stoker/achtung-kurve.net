import MainLoop from 'mainloop.js'
import io from 'socket.io-client'

const gameServer = 'http://localhost:3005';

const draw = () => {
	console.log('drawing')
}

const initialize = () => {
	const socket = io(gameServer)
	console.log(socket)

	MainLoop.setDraw(() => {
		this.draw();
	})
}

export default {
	initialize,
	draw
}