const express = require('express');
const morgan = require('morgan');
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');
const client = require('./conexion_db');

const port = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);

// importamos la ruta
const routingRoutes = require('./routes/routing.routes');
// const authUsersRoutes = require('./routes/authUsersRoutes');

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

client
  .connect()
  .then((res) => console.log('conectado a la BD'))
  .catch((error) => console.log('error de conexión'));

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

app.use(morgan('dev'));
app.use(express.json());

app.use(routingRoutes);
app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});
const allUsers = [];

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('userConected', (user) => {
    allUsers.push(user);
  });
  socket.emit('allUsers', allUsers);

  // socket.on('leave', (userLogout) => {
  //   // console.log('userLogout', userLogout);
  //   allUsers = allUsers.filter((e) => e.id !== userLogout.id);
  //   // console.log('salida ', allUsers);
  // });
  socket.on('chatmessage', (message) => {
    // console.log(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('nameChanel', (chanel) => {
    // console.log(chanel);
    socket.broadcast.emit('namesChanels', chanel);
  });
});
server.listen(port);
