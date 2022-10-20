const { Client } = require('pg');

const { db } = require('./config');

const client = new Client({
  host: db.host,
  user: db.user,
  port: db.port,
  database: db.database,
  password: db.password,
  ssl: db.ssl,
});

module.exports = client;
