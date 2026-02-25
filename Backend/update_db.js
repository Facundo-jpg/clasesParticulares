const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'clases_particulares'
});

console.log('Actualizando base de datos...');

connection.connect((err) => {
  if (err) {
    console.error('Error conectando:', err);
    process.exit(1);
  }

  // Agregar nuevo estado 'disponible' y el campo precio_hora
  const sql = `
    ALTER TABLE clases
    MODIFY COLUMN estado ENUM('disponible', 'pendiente', 'confirmada', 'realizada', 'cancelada', 'pagada') DEFAULT 'disponible',
    ADD COLUMN precio_hora DECIMAL(10,2) AFTER direccion;
  `;

  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error actualizando:', err);
      if (err.code !== 'ER_DUP_FIELDNAME' && err.code !== 'ER_BAD_NULL_ERROR') {
        connection.end();
        process.exit(1);
      }
    }

    console.log('Base de datos actualizada correctamente');
    connection.end();
  });
});