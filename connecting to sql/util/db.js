const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'db',
    password: 'san7211@'
});

module.exports = pool.promise();