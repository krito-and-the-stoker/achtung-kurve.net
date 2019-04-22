import socketIO from 'socket.io'
import Recorder from './recorder'

const io = socketIO(3005);


io.on('connection', socket => {
	console.log('client connected')

  socket.on('start', data => {
  	console.log('game started')
  	const recorder = new Recorder({
  		...data,
  		filename: `data/game-${(new Date()).getTime()}.json`
  	})

  	const record = data => recorder.record(data)
	  socket.on('step', record)

	  const stop = () => {
	  	socket.off('step', record)
	  	socket.off('stop', stop)
	  	recorder.export()
	  }
	  socket.on('stop', stop)
  })

});

console.log('listening on Port 3005');