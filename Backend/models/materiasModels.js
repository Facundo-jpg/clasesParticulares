const db = require('../config/db');

//LISTAR TODAS LAS MATERIAS
exports.listarMaterias = async () => {
    const [rows] = await db.query('SELECT * FROM materias WHERE estado = "activo" ORDER BY nombre');
    return rows;
}

//OBTENER MATERIA POR ID
exports.getMateriaById = async (id) => {
    const [rows] = await db.query('SELECT * FROM materias WHERE id = ? AND estado = "activo"', [id]);
    return rows[0] || null;
}

//CREAR MATERIA
exports.crearMateria = async (nombre, descripcion, nivel) => {
    const [result] = await db.query('INSERT INTO materias (nombre, descripcion, nivel) VALUES (?, ?, ?)', [nombre, descripcion, nivel || 'todos']);
    return await exports.getMateriaById(result.insertId);
}

//ACTUALIZAR MATERIA
exports.actualizarMateria = async (id, datos) => {
    const campos = [];
    const valores = [];
    const camposPermitidos = ['nombre', 'descripcion', 'nivel', 'estado'];

    Object.keys(datos).forEach(key => {
        if (datos[key] !== undefined && key !== 'id' && camposPermitidos.includes(key)) {
            campos.push(`${key} = ?`);
            valores.push(datos[key]);
        }
    });

    if (campos.length === 0) return null;

    valores.push(id);
    const [result] = await db.query(`UPDATE materias SET ${campos.join(', ')} WHERE id = ?`, valores);

    if (result.affectedRows > 0) {
        return await exports.getMateriaById(id);
    }
    return null;
}

//ELIMINAR MATERIA (BORRADO LÓGICO)
exports.eliminarMateria = async (id) => {
    const [result] = await db.query('UPDATE materias SET estado = "inactivo" WHERE id = ?', [id]);
    return result.affectedRows > 0;
}

//OBTENER MATERIAS POR PROFESOR
exports.getMateriasPorProfesor = async (id_profesor) => {
    const [rows] = await db.query(`
        SELECT m.*, pm.precio_hora, pm.modalidad, pm.descripcion_profesor
        FROM materias m
        INNER JOIN profesor_materia pm ON m.id = pm.id_materia
        WHERE pm.id_profesor = ? AND m.estado = "activo"
    `, [id_profesor]);
    return rows;
}

//OBTENER PROFESORES POR MATERIA
exports.getProfesoresPorMateria = async (id_materia) => {
    const [rows] = await db.query(`
        SELECT u.id, u.nombre, u.apellido, u.foto_perfil, pm.precio_hora, pm.modalidad, pm.descripcion_profesor
        FROM usuarios u
        INNER JOIN profesor_materia pm ON u.id = pm.id_profesor
        WHERE pm.id_materia = ? AND u.estado = "activo" AND u.rol = "profesor"
    `, [id_materia]);
    return rows;
}