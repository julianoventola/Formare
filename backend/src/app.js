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

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //Janeiro = 0!
    let yyyy = today.getFullYear();
    let fullDate = `${dd}/${mm}/${yyyy}`;

    console.log(fullDate);
    socket.emit('message', {
      user: 'admin',
      text: `${fullDate} - ${user.username}, welcome to the room ${user.room}`,
    });
    socket.join(user.room);
    socket.broadcast.to(user.room).emit('message', {
      user: 'admin',
      text: `${fullDate} -${user.username}, has joined the room!`,
    });
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    console.log(user);

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
