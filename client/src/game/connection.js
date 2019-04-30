import io from 'socket.io-client'


const server = process.env.REACT_APP_GAMESERVER

let socket = null
const initialize = () => {
	console.log(`connecting to ${server}`)
	socket = io(server)
}

const step = (lines, time) => {
	var newLines = []
	lines.forEach((line) => {
		newLines.push({
			from: line.from,
			to: line.to,
			playerId: line.player.id
		})
	})

	socket.emit('step', {
		lines: newLines,
		time: time
	})
}

const start = ({ width, height, players, start, stop, step }) => {
	socket.emit('ready', { width, height, players })
	socket.on('start', start)
	socket.on('stop', stop)
	socket.on('step', step)
}

const stop = () => {
	socket.emit('stop')
}

export default {
	initialize,
	step,
	start,
	stop,
}