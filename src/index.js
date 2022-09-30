const express = require('express');
const client = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

client.connect();
// console.log(client);

client
  .query('SELECT * FROM users')
  .then((response) => {
    console.log('conectado');
    console.log(response.rows);
    client.end();
  })
  .catch((err) => {
    console.log('error');
    client.end();
  });

// app.get('/users', (req, res) => {
//   client.query(`Select * from users`, (err, result) => {
//     if (!err) {
//       res.send(result.rows);
//     } else {
//       console.log('holas',err);
//     }
//   });
//   client.end();
// });
