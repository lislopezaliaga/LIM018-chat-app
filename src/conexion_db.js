const { Client } = require('pg');

const { db } = require('./config');

console.log(db);

const client = new Client({
  host: db.host,
  user: db.user,
  port: db.port,
  database: db.database,
  password: db.password,
  ssl: db.ssl,
});

// const client = new Client({
//   host: 'dpg-cd89736n6mpnkghn2bk0-a.ohio-postgres.render.com',
//   user: 'chatowl',
//   port: 5432,
//   database: 'default_database',
//   password: 'P3hOipDSV95cr2S4iD5YfgDdiAJlAhpA',
// });

// console.log(client);

module.exports = client;
