import socketIO from 'socket.io'
import Recorder from './recorder'
import Connection from './connection'

const io = socketIO(3005);


let connections = []
io.on('connection', socket => {
	console.log('client connected')
	const connection = Connection.initialize({ socket })
	connections.push(connection)
	socket.on('disconnect', reason => {
		console.log('client disconnected', reason)
		connections = connections.filter(c => c !== connection)
	})

  socket.on('ready', data => {
  	console.log('player ready')
  	Connection.ready(connection)
  	if (connections.length < 2  || !connections.every(c => c.ready)) {
  		return
  	}

	  console.log('starting')
	  connections.forEach(con => con.socket.emit('start', con.id))

	  connections.forEach(con => {
		  const distribute = data => {
		  	data.id = con.id
		  	Connection.broadcast(connections, 'step', data)
		  }
		  con.socket.on('step', distribute)
	  })

	  const stop = () => {
	  	socket.off('step', distribute)
	  	socket.off('stop', stop)
	  	console.log('stopped by', connection.id)
	  	Connection.broadcast(connections, 'stop')
	  }
	  socket.on('stop', stop)
  })

});

console.log('listening on Port 3005');