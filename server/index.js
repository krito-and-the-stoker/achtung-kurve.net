import socketIO from 'socket.io'
const io = socketIO(3005);


io.on('connection', socket => {
	console.log('client connected')
  socket.on('tick', data => {
    socket.emit('tick', data)
  });
});

console.log('listening on Port 3005');