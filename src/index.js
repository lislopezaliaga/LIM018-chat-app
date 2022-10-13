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
let newChanels = [];
io.on('connection', (socket) => {
  const nickNames = [];
  socket.on('nuevo usuario', (datos) => {
    // console.log(datos);
    nickNames.push(datos);
    console.log(nickNames);
    // Nos devuelve el indice si el dato existe, es decir, si ya existe el nombre de usuario:
    // if (nickNames.indexOf(datos) != -1) {
    //   callback(false);
    // } else {
    //   //Si no existe le respondemos al cliente con true y agregamos el nuevo usuario:
    //   callback(true);
    //   socket.nickname = datos;

    //   //Enviamos al cliente el array de usuarios:
    //   actualizarUsuarios();
    // }
  });

  console.log('a user connected', socket.id);
  socket.on('chatmessage', (message) => {

    console.log(message);
    socket.broadcast.emit('message', {
      body: message.message,
      from: message.user,
    });
  });
  // io.on("newUser", data => {
  //   users.push(data)
  //   io.emit("newUserResponse", users)
  // })
  socket.on('nameChanel', (chanel) => {
    newChanels.push(chanel);
  console.log(newChanels);
    socket.emit('namesChanels', newChanels);
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
