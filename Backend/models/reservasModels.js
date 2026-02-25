const db = require('../config/db');

//CREAR RESERVA

exports.crearTurno = async (id_alumno, id_profesor, id_materia, fecha, hora_inicio, hora_fin, estado) => {
    const [rows] = await db.query('INSERT INTO reservas (id_alumno, id_profesor, id_materia, fecha, hora_inicio, hora_fin, estado) VALUES (?, ?, ?, ?, ?, ?, ?)', [id_alumno, id_profesor, id_materia, fecha, hora_inicio, hora_fin, estado]);
}

//MODIFICAR RESERVA
exports.editarTurno = async (id_reserva, id_alumno, id_profesor, id_materia, fecha, hora_inicio, hora_fin, estado) => {
    const [rows] = await db.query('UPDATE reservas SET id_alumno = ?, id_profesor = ?, id_materia = ?, fecha = ?, hora_inicio = ?, hora_fin = ?, estado = ? WHERE id_reserva = ?', [id_alumno, id_profesor, id_materia, fecha, hora_inicio, hora_fin, estado, id_reserva]);
    return rows;
}   

//CANCELAR RESERVA
exports.cancelarTurno = async (id_reserva) => {
    const [rows] = await db.query("DELETE FROM reservas where id_reserva = ?", [id_reserva]);
    return rows;
}

//LISTAR RESERVA POR ID
exports.reservasPorId = async (id_alumno) => {
    const [rows] = await db.query('SELECT * FROM reservas WHERE id_alumno = ?', [id_alumno]);
    return rows;
}
