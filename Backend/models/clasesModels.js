const db = require('../config/db');

//CREAR CLASE
exports.crearClase = async (datos) => {
    const { id_alumno, id_profesor, id_materia, fecha_clase, duracion_minutos, modalidad, link_online, direccion, precio_hora } = datos;

    // Determinar el estado inicial
    const estadoInicial = id_alumno ? 'pendiente' : 'disponible';

    const [result] = await db.query(
        'INSERT INTO clases (id_alumno, id_profesor, id_materia, fecha_clase, duracion_minutos, modalidad, link_online, direccion, precio_hora, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id_alumno || null, id_profesor, id_materia, fecha_clase, duracion_minutos || 60, modalidad, link_online, direccion, precio_hora, estadoInicial]
    );

    return await exports.getClaseById(result.insertId);
}

//OBTENER CLASE POR ID
exports.getClaseById = async (id) => {
    const [rows] = await db.query(`
        SELECT c.*,
               u1.nombre as alumno_nombre, u1.apellido as alumno_apellido,
               u2.nombre as profesor_nombre, u2.apellido as profesor_apellido,
               m.nombre as materia_nombre
        FROM clases c
        LEFT JOIN usuarios u1 ON c.id_alumno = u1.id
        LEFT JOIN usuarios u2 ON c.id_profesor = u2.id
        LEFT JOIN materias m ON c.id_materia = m.id
        WHERE c.id = ?
    `, [id]);
    return rows[0] || null;
}

//LISTAR CLASES POR ALUMNO
exports.listarClasesPorAlumno = async (id_alumno, estado = null) => {
    let query = `
        SELECT c.*,
               u2.nombre as profesor_nombre, u2.apellido as profesor_apellido,
               m.nombre as materia_nombre
        FROM clases c
        LEFT JOIN usuarios u2 ON c.id_profesor = u2.id
        LEFT JOIN materias m ON c.id_materia = m.id
        WHERE c.id_alumno = ?
    `;
    const params = [id_alumno];

    if (estado) {
        query += ' AND c.estado = ?';
        params.push(estado);
    }

    query += ' ORDER BY c.fecha_clase DESC';

    const [rows] = await db.query(query, params);
    return rows;
}

//LISTAR CLASES POR PROFESOR
//INSCRIBIR ALUMNO EN CLASE DISPONIBLE
exports.inscribirAlumno = async (id_clase, id_alumno) => {
    const [result] = await db.query(
        'UPDATE clases SET id_alumno = ?, estado = "pendiente" WHERE id = ? AND estado = "disponible"',
        [id_alumno, id_clase]
    );

    if (result.affectedRows === 0) {
        throw new Error('Clase no disponible o ya fue tomada');
    }

    return await exports.getClaseById(id_clase);
}

//LISTAR CLASES DISPONIBLES
exports.listarClasesDisponibles = async (id_materia = null) => {
    let query = `
        SELECT c.*,
               u.nombre as profesor_nombre, u.apellido as profesor_apellido,
               m.nombre as materia_nombre
        FROM clases c
        LEFT JOIN usuarios u ON c.id_profesor = u.id
        LEFT JOIN materias m ON c.id_materia = m.id
        WHERE c.estado = "disponible"
        AND c.fecha_clase > NOW()
    `;
    const params = [];

    if (id_materia) {
        query += ' AND c.id_materia = ?';
        params.push(id_materia);
    }

    query += ' ORDER BY c.fecha_clase ASC';

    const [rows] = await db.query(query, params);
    return rows;
}

exports.listarClasesPorProfesor = async (id_profesor, estado = null) => {
    let query = `
        SELECT c.*,
               u1.nombre as alumno_nombre, u1.apellido as alumno_apellido,
               m.nombre as materia_nombre
        FROM clases c
        LEFT JOIN usuarios u1 ON c.id_alumno = u1.id
        LEFT JOIN materias m ON c.id_materia = m.id
        WHERE c.id_profesor = ?
    `;
    const params = [id_profesor];

    if (estado) {
        query += ' AND c.estado = ?';
        params.push(estado);
    }

    query += ' ORDER BY c.fecha_clase DESC';

    const [rows] = await db.query(query, params);
    return rows;
}

//ACTUALIZAR CLASE
exports.actualizarClase = async (id, datos) => {
    const campos = [];
    const valores = [];
    const camposPermitidos = ['id_alumno', 'id_profesor', 'id_materia', 'fecha_clase', 'duracion_minutos', 'modalidad', 'link_online', 'direccion', 'precio_hora', 'notas', 'estado'];

    Object.keys(datos).forEach(key => {
        if (datos[key] !== undefined && key !== 'id' && camposPermitidos.includes(key)) {
            campos.push(`${key} = ?`);
            valores.push(datos[key]);
        }
    });

    if (campos.length === 0) return null;

    valores.push(id);
    const [result] = await db.query(`UPDATE clases SET ${campos.join(', ')} WHERE id = ?`, valores);

    if (result.affectedRows > 0) {
        return await exports.getClaseById(id);
    }
    return null;
}

//CANCELAR CLASE
exports.cancelarClase = async (id) => {
    const [result] = await db.query('UPDATE clases SET estado = "cancelada" WHERE id = ?', [id]);
    return result.affectedRows > 0;
}

//CONFIRMAR CLASE
exports.confirmarClase = async (id) => {
    const [result] = await db.query('UPDATE clases SET estado = "confirmada" WHERE id = ?', [id]);
    return result.affectedRows > 0;
}

//MARCAR CLASE COMO REALIZADA
exports.marcarRealizada = async (id) => {
    const [result] = await db.query('UPDATE clases SET estado = "realizada" WHERE id = ?', [id]);
    return result.affectedRows > 0;
}

//AGREGAR CALIFICACIÓN
exports.calificarClase = async (id, calificacion_alumno, calificacion_profesor, comentario_alumno, comentario_profesor) => {
    const campos = [];
    const valores = [];

    if (calificacion_alumno !== undefined && calificacion_alumno !== null) {
        if (calificacion_alumno < 1 || calificacion_alumno > 10) {
            throw new Error('La calificación debe estar entre 1 y 10');
        }
        campos.push('calificacion_alumno = ?');
        valores.push(calificacion_alumno);
    }
    if (calificacion_profesor !== undefined && calificacion_profesor !== null) {
        if (calificacion_profesor < 1 || calificacion_profesor > 10) {
            throw new Error('La calificación debe estar entre 1 y 10');
        }
        campos.push('calificacion_profesor = ?');
        valores.push(calificacion_profesor);
    }
    if (comentario_alumno !== undefined) {
        campos.push('comentario_alumno = ?');
        valores.push(comentario_alumno);
    }
    if (comentario_profesor !== undefined) {
        campos.push('comentario_profesor = ?');
        valores.push(comentario_profesor);
    }

    if (campos.length === 0) return null;

    valores.push(id);
    const [result] = await db.query(`UPDATE clases SET ${campos.join(', ')} WHERE id = ?`, valores);

    return result.affectedRows > 0;
}