const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  database: 'default_database',
  password: 'postgres',
});

// const { db } = require('./config');
// console.log(db.host);
// const client = new Client({
//   host: db.host,
//   user: db.user,
//   port: db.port,
//   database: db.database,
//   password: db.password,
// });

// console.log(client);

module.exports = client;
