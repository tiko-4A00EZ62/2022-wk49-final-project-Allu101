const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  database: process.env.DB_DB,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = connection;
