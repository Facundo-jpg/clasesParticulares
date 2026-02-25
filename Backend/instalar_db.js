const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

// Configuración de conexión sin especificar base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  multipleStatements: true
});

console.log('Conectando a MySQL...');

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    console.log('\nAsegúrate de que:');
    console.log('1. MySQL/XAMPP esté instalado');
    console.log('2. El servicio MySQL esté corriendo');
    console.log('3. El usuario root exista sin contraseña');
    process.exit(1);
  }

  console.log('Conectado exitosamente a MySQL');

  // Leer el archivo SQL
  const sqlPath = path.join(__dirname, '..', 'database.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  console.log('Ejecutando script SQL...');

  // Ejecutar el script SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error ejecutando script SQL:', err);
      connection.end();
      process.exit(1);
    }

    console.log('Base de datos creada exitosamente');
    console.log('Resultados:', results);

    connection.end();
    console.log('Instalación completada');
  });
});