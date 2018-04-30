import socketIO from 'socket.io'

var io = require('socket.io')(3005);


io.on('connection', function (socket) {
  socket.on('startGame', function (data) {
    console.log(data);
  });
});
console.log('listening on Port 3005');