const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const formatMessage = require('./data/formatMessage');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require('./data/Users');

const botName = 'ChatTG Bot: ';

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);
    socket.emit('message', formatMessage(botName, 'Welcome to Chat TG!'));

    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  socket.on('chatMessage', (msg) => {
    // console.log(msg);
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

server.listen(3001, () => {
  console.log('SERVER RUNNING');
});
// const PORT = process.env.PORT || 3001;

// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
