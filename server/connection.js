const initialize = ({ socket }) => ({
	socket,
	id: nextId(),
	ready: false
})

let currentId = 0
const nextId = () => {
	currentId += 1
	return currentId	
}

const ready = connection => {
	connection.ready = true
}

const broadcast = (connections, event, data) => {
	connections.forEach(con => con.socket.emit(event, data))
}

export default {
	initialize,
	ready,
	broadcast
}