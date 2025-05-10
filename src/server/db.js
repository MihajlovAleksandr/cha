const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);


connection.connect(err => {
  if (err) {
    console.error('Ошибка подключения:', err);
    return;
  }
  console.log('Подключено к базе данных');
});

module.exports = connection;
