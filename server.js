const io = require('socket.io')(4001);
const users={};


io.on('connection', socket => {
    console.log("Server is listening on port 4001. New user has been connected.");
    socket.on('new-user', name => {
        users[socket.id] = name;
        console.log(users[socket.id]+" connected")
        socket.broadcast.emit('user-connected', name);
    })
    socket.on('send-chat-message', message => {
      socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]})
    })
    socket.on('disconnect', () => {
      socket.broadcast.emit('user-disconnected', users[socket.id]);
      console.log(users[socket.id]+" disconnected");
      delete users[socket.id];
  })
})
