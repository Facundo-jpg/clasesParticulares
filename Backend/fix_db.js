const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'clases_particulares'
});

console.log('Actualizando tabla clases...');

connection.connect((err) => {
  if (err) {
    console.error('Error conectando:', err);
    process.exit(1);
  }

  // Modificar la tabla para permitir id_alumno NULL
  const sql = `
    ALTER TABLE clases
    MODIFY COLUMN id_alumno INT NULL;
  `;

  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error actualizando:', err);
      connection.end();
      process.exit(1);
    }

    console.log('Tabla clases actualizada correctamente');
    connection.end();
  });
});