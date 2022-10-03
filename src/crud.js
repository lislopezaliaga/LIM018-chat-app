const client = require('./db');

client.connect();
function insertUsers(name, email, password, estado) {
  client
    .query(
      `INSERT INTO public.users(name, email, password, estado)
          VALUES ( '${name}', '${email}', '${password}', ${estado})`
    )
    .then((response) => {
      console.log('conectado');
      console.log(response.rows);
      client.end();
    })
    .catch((err) => {
      console.log(err);
      client.end();
    });
}
// insertUsers('Carlos', 'email', '123456', true);

function viewUsers(estado) {
  client
    .query(`SELECT * FROM users WHERE estado=${estado}`)
    .then((response) => {
      console.log('conectado');
      console.log(response.rows);
      client.end();
    })
    .catch((err) => {
      console.log('error');
      client.end();
    });
}
function updateUsers(id, status) {
  client
    .query(`UPDATE public.users SET estado=${status} where id_user=${id}`)
    // SET columna1 = 'nuevo_valor' WHERE columna1 = 'valor1'
    .then((response) => {
      console.log('conectado');
      console.log(response.rows);
      client.end();
    })
    .catch((err) => {
      console.log(err);
      client.end();
    });
}
function deleteUsers(id) {
  client
    .query(`DELETE FROM users WHERE id_user= ${id};`)
    // SET columna1 = 'nuevo_valor' WHERE columna1 = 'valor1'
    .then((response) => {
      console.log('conectado');
      console.log(response.rows);
      client.end();
    })
    .catch((err) => {
      console.log(err);
      client.end();
    });
}
// deleteUsers(1)

// updateUsers(2,false);
viewUsers(true);
// UPDATE nombre_tabla SET columna1 = 'nuevo_valor' WHERE columna1 = 'valor1';

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
