const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Es7585**',
        database: 'manager'
    },

);

module.exports = db;