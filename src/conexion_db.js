const { Client } = require('pg');

/* const client= new Client('postgres://postgres:postgres@localhost:15432/default_database') */
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  database: 'default_database',
  password: 'postgres',
});

// console.log(client);

module.exports = client;
