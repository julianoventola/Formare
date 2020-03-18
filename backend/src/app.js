const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

require('./database');

const router = require('./routes');

// --> GLOBALS <--
const PORT = process.env.PORT || 3333;

// Server with socket.io
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(express.json());
app.use(router);

io.on('connection', socket => {
  // Get new connections
  socket.on('join', ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });

    if (error) return callback(error);

    socket.emit('message', {
      user: 'admin',
      text: `${user.username}, welcome to the room ${user.room}`,
    });

    socket.broadcast.to(user.room).emit('message', {
      user: 'admin',
      text: `${user.username}, has joined the room!`,
    });

    socket.join(user.room);
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', {
      user: user.username,
      text: message,
    });
    callback();
  });

  // When user leaves
  socket.on('disconnect', () => {
    console.log('User had left us :(');
  });
});

server.listen(PORT, () => {
  console.log(`Server runnin on port ${PORT}`);
});
