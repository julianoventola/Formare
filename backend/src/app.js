const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const router = require('./routes');

require('./database');

// Room and USer Controller
const {
  addUser,
  getUsersInRoom,
  removeUser,
  getUser,
} = require('./app/controllers/ChatUsersController');

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
      text: `${user.username}, Bem vindo à sala ${user.room}`,
    });

    socket.broadcast.to(user.room).emit('message', {
      user: 'admin',
      text: `${user.username}, entrou na sala!`,
    });
    socket.join(user.room);

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    // User message
    io.to(user.room).emit('message', {
      user: user.username,
      text: message,
    });

    // Update users in room
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  // When user leaves
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.username}, saiu da sala!`,
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server runnin on port ${PORT}`);
});
