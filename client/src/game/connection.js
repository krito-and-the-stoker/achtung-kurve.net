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

const start = ({ width, height, players }) => {
	socket.emit('start', { width, height, players })
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