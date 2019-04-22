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

	  socket.on('stop', () => {
	  	socket.off('step', record)
	  	recorder.export()
	  })
  })

});

console.log('listening on Port 3005');