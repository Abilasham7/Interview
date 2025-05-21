const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Abilash123', 
    database: 'student'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

module.exports = connection;