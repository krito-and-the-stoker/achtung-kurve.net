import socketIO from 'socket.io'
const io = socketIO(3005);


io.on('connection', socket => {
  socket.on('startGame', data => {
    console.log(data);
  });
});

console.log('listening on Port 3005');