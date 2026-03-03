const db = require('../config/db');

//LOGIN
exports.buscarUsuario = async (email, password) => {
    const [rows] = await db.query('SELECT id, nombre, apellido, email, rol, estado FROM usuarios WHERE email = ? AND password = ? AND estado = "activo"', [email, password]);
    return rows[0] || null;
};

//REGISTRO
exports.nuevoUsuario = async (nombre,apellido,telefono,password,rol,email) => {
    const [result] = await db.query('INSERT INTO usuarios (nombre, apellido, telefono, password, rol, email) VALUES (?, ?, ?, ?, ?, ?)', [nombre, apellido, telefono, password, rol, email]);
    const [newUser] = await db.query('SELECT id, nombre, apellido, email, rol FROM usuarios WHERE id = ?', [result.insertId]);
    return newUser[0];
}

//OBTENER USUARIO POR ID
exports.getUsuarioById = async (id) => {
    const [rows] = await db.query('SELECT id, nombre, apellido, email, telefono, rol, foto_perfil, fecha_creacion FROM usuarios WHERE id = ? AND estado = "activo"', [id]);
    return rows[0] || null;
}

//ACTUALIZAR USUARIO
exports.actualizarUsuario = async (id, datos) => {
    const campos = [];
    const valores = [];
    const camposPermitidos = ['nombre', 'apellido', 'telefono', 'password', 'foto_perfil'];

    Object.keys(datos).forEach(key => {
        if (datos[key] !== undefined && key !== 'id' && camposPermitidos.includes(key)) {
            campos.push(`${key} = ?`);
            valores.push(datos[key]);
        }
    });

    if (campos.length === 0) return null;

    valores.push(id);
    const [result] = await db.query(`UPDATE usuarios SET ${campos.join(', ')} WHERE id = ?`, valores);

    if (result.affectedRows > 0) {
        return await exports.getUsuarioById(id);
    }
    return null;
}

//ELIMINAR USUARIO (BORRADO LÓGICO)
exports.eliminarUsuario = async (id) => {
    const [result] = await db.query('UPDATE usuarios SET estado = "inactivo" WHERE id = ?', [id]);
    return result.affectedRows > 0;
}

//LISTAR PROFESORES
exports.listarProfesores = async () => {
    const [rows] = await db.query('SELECT id, nombre, apellido, email, foto_perfil FROM usuarios WHERE rol = "profesor" AND estado = "activo"');
    return rows;
}

//VERIFICAR EMAIL EXISTENTE
exports.emailExiste = async (email) => {
    const [rows] = await db.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    return rows.length > 0;
}
