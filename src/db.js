const { Client } = require('pg');

/* const client= new Client('postgres://postgres:postgres@localhost:15432/default_database') */
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 15432,
  database: 'default_database',
  password: 'postgres',
});

// console.log(client);

// client.connect();

module.exports = client;
