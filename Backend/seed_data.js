const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'clases_particulares',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const connection = pool.promise();

async function insertarDatos() {
  console.log('Insertando datos de prueba...');

  try {
    // Insertar más profesores
    const profesores = [
      ['María', 'Rodríguez', 'maria.profesor@email.com', '1122334455', 'prof123', 'profesor'],
      ['Pedro', 'Martínez', 'pedro.profesor@email.com', '5544332211', 'prof123', 'profesor'],
      ['Ana', 'López', 'ana.profesor@email.com', '9988776655', 'prof123', 'profesor'],
      ['Luis', 'Sánchez', 'luis.profesor@email.com', '7766554433', 'prof123', 'profesor'],
      ['Laura', 'Gómez', 'laura.profesor@email.com', '3344556677', 'prof123', 'profesor']
    ];

    for (const profesor of profesores) {
      await connection.query(
        'INSERT INTO usuarios (nombre, apellido, email, telefono, password, rol) VALUES (?, ?, ?, ?, ?, ?)',
        profesor
      );
    }

    console.log('Profesores insertados');

    // Asignar materias a profesores
    const profesorMaterias = [
      [2, 7, 45.00, 'ambas', 'Especialista en biología molecular y genética'],
      [2, 3, 40.00, 'online', 'Experto en química orgánica'],
      [3, 2, 50.00, 'ambas', 'Físico con doctorado en partículas'],
      [4, 5, 35.00, 'online', 'Nativo bilingüe, certificado Cambridge'],
      [4, 7, 40.00, 'online', 'Inglés técnico para ciencias'],
      [5, 6, 30.00, 'presencial', 'Historiadora especializada en historia argentina'],
      [5, 4, 60.00, 'online', 'Desarrolladora full-stack con 10 años de experiencia'],
      [5, 1, 45.00, 'ambas', 'Matemática con enfoque en cálculo avanzado']
    ];

    for (const pm of profesorMaterias) {
      await connection.query(
        'INSERT INTO profesor_materia (id_profesor, id_materia, precio_hora, modalidad, descripcion_profesor) VALUES (?, ?, ?, ?, ?)',
        pm
      );
    }

    console.log('Asignaciones de materias insertadas');

    // Insertar más alumnos
    const alumnos = [
      ['Juan', 'Pérez', 'juan.alumno@email.com', '123456789', 'alumno123', 'estudiante'],
      ['María', 'Gómez', 'maria.alumno@email.com', '987654321', 'alumno123', 'estudiante'],
      ['Carlos', 'López', 'carlos.alumno@email.com', '456789123', 'alumno123', 'estudiante'],
      ['Lucía', 'Fernández', 'lucia.alumno@email.com', '789123456', 'alumno123', 'estudiante'],
      ['Diego', 'Martínez', 'diego.alumno@email.com', '321654987', 'alumno123', 'estudiante']
    ];

    for (const alumno of alumnos) {
      await connection.query(
        'INSERT INTO usuarios (nombre, apellido, email, telefono, password, rol) VALUES (?, ?, ?, ?, ?, ?)',
        alumno
      );
    }

    console.log('Alumnos insertados');

    // Crear clases disponibles de ejemplo
    const clasesDisponibles = [
      [2, 7, '2025-12-20 10:00:00', 60, 'online', null, null, 40.00], // María - Biología
      [3, 2, '2025-12-20 14:00:00', 90, 'online', null, null, 50.00], // Pedro - Física
      [4, 5, '2025-12-20 16:00:00', 60, 'online', null, null, 35.00], // Luis - Inglés
      [5, 1, '2025-12-20 18:00:00', 120, 'online', null, null, 45.00], // Laura - Matemática
      [2, 3, '2025-12-21 09:00:00', 90, 'online', null, null, 40.00], // María - Química
      [3, 2, '2025-12-21 11:00:00', 60, 'presencial', null, 'Av. Corrientes 1000', 50.00], // Pedro - Física
      [9, 1, '2025-12-21 15:00:00', 90, 'online', null, null, 45.00], // Carlos - Matemática
      [10, 4, '2025-12-21 17:00:00', 60, 'online', null, null, 60.00], // Ana - Programación
      [11, 6, '2025-12-22 10:00:00', 90, 'presencial', null, 'Caballito 1234', 30.00], // Luis - Historia
      [12, 7, '2025-12-22 14:00:00', 60, 'online', null, null, 35.00], // Laura - Inglés
      [2, 1, '2025-12-22 16:00:00', 120, 'online', null, null, 45.00], // María - Matemática
      [3, 5, '2025-12-23 10:00:00', 60, 'online', null, null, 40.00], // Pedro - Inglés
      [4, 3, '2025-12-23 14:00:00', 90, 'online', null, null, 40.00], // Luis - Química
      [5, 4, '2025-12-23 16:00:00', 120, 'online', null, null, 60.00], // Laura - Programación
      [2, 2, '2025-12-23 18:00:00', 90, 'presencial', null, 'Palermo 5678', 45.00]  // María - Física
    ];

    for (const clase of clasesDisponibles) {
      await connection.query(
        'INSERT INTO clases (id_alumno, id_profesor, id_materia, fecha_clase, duracion_minutos, modalidad, link_online, direccion, precio_hora, estado) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, "disponible")',
        clase
      );
    }

    console.log('Clases disponibles insertadas');

    // Insertar algunas clases ya confirmadas para ejemplo
    const clasesConfirmadas = [
      [7, 2, 7, '2025-12-18 15:00:00', 60, 'online', 'zoom.us/j/123456', null, 40.00, 'confirmada'],
      [8, 5, 1, '2025-12-18 17:00:00', 90, 'presencial', null, 'Centro 123', 45.00, 'confirmada'],
      [9, 3, 2, '2025-12-19 10:00:00', 120, 'online', 'meet.google.com/abc', null, 50.00, 'realizada']
    ];

    for (const clase of clasesConfirmadas) {
      await connection.query(
        'INSERT INTO clases (id_alumno, id_profesor, id_materia, fecha_clase, duracion_minutos, modalidad, link_online, direccion, precio_hora, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        clase
      );
    }

    console.log('Clases confirmadas insertadas');

    console.log('\n¡Datos de prueba insertados exitosamente!');
    console.log('\nUsuarios de prueba:');
    console.log('Alumnos:');
    console.log('- juan.alumno@email.com / alumno123');
    console.log('- maria.alumno@email.com / alumno123');
    console.log('- carlos.alumno@email.com / alumno123');
    console.log('Profesores:');
    console.log('- maria.profesor@email.com / prof123');
    console.log('- pedro.profesor@email.com / prof123');
    console.log('- luis.profesor@email.com / prof123');

  } catch (error) {
    console.error('Error insertando datos:', error);
  }

  await pool.end();
}

insertarDatos();