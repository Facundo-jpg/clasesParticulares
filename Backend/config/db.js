const mysql = require('mysql2');
require('dotenv').config();
const credenciales = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'clasesparticulares'
}

const db = mysql.createPool(credenciales);

// Test connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
    connection.release();
});

module.exports = db.promise();