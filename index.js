const express = require('express');

const morgan = require('morgan');

const { Server } = require('socket.io');

const http = require('http');

const cors = require('cors');

const port = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

app.use(cors());

app.use(morgan('dev'));

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  socket.on('chatmessage', (message) => {
    console.log(message);
    socket.broadcast.emit('message', {
      body:message,
      from:socket.id,
    });
  });
});
server.listen(port);
console.log('server');

// const io = require('socket.io')(http);

// app.get('/', (req, res) => {
//   res.sendFile(`${__dirname}/index.html`);
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

// io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg);
//   });
// });

// http.listen(port, () => {
//   console.log(`Socket.IO server running at http://localhost:${port}/`);
// });
