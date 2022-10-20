const express = require('express');
const morgan = require('morgan');
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');

const cloudinary = require('cloudinary');
require('dotenv').config();

const client = require('./conexion_db');

const port = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
// cloudinary.config({
//   cloud_name: 'dv95g7xon',
//   api_key: '577194571961552',
//   api_secret: 'XgKssq9aM150V0gzohlfDW7fcts',
// });

app.use(cors());
app.delete('/:public_id', async (req, res) => {
  const { public_id } = req.params;
  try {
    await cloudinary.uploader.destroy(public_id);
    res.status(200).send();
  } catch (error) {
    res.status(400).send();
  }
});

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
  .catch((error) => console.log('error de conexión', error));

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

let allUsers = [];

io.on('connection', (socket) => {
  // console.log('a user connected', socket.id);

  socket.on('userConected', (user) => {
    const userDuplicate = allUsers.find((element) => element.id === user.id);

    if (!userDuplicate) {
      allUsers.push(user);
      socket.broadcast.emit('allUsers', allUsers);
    }
  });

  socket.on('userDisconnected', (userLogout) => {
    allUsers = allUsers.filter((e) => e.id !== userLogout.id);
    socket.broadcast.emit('allUsers', allUsers);
  });

  socket.on('chatmessage', (message) => {
    socket.broadcast.emit('message', message);
  });

  socket.on('nameChanel', (chanel) => {
    socket.broadcast.emit('namesChanels', chanel);
  });
});
server.listen(port);
