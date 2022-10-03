const express = require('express');

const app = express();

const http = require('http');

const server = http.createServer(app);

const { Server } = require('socket.io');

const io = new Server(server);
// const client = require('./db');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// client.connect();
// console.log(client);

// client
//   .query('SELECT * FROM users')
//   .then((response) => {
//     console.log('conectado');
//     console.log(response.rows);
//     client.end();
//   })
//   .catch((err) => {
//     console.log('error');
//     client.end();
//   });
