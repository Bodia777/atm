const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'LV123!',
    database: 'atm',
});

module.exports = db;
