const Reservas = require('../models/reservasModels');

//CREAR RESERVAS
exports.crearReserva = async (req, res) => {
    try {
        const { id_alumno, id_profesor, id_materia, fecha, hora_inicio, hora_fin, estado } = req.body;

        const nuevaReserva = await Reservas.crearTurno(id_alumno, id_profesor, id_materia, fecha, hora_inicio, hora_fin, estado);
        res.status(201).json({ message: 'Reserva creada exitosamente', nuevaReserva });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la reserva' });
    }
}   

//MODIFICAR RESERVA
exports.modificarTurno = async (req, res) => {
    try {
        const id_reserva = req.params.id;
        const { id_alumno, id_profesor, id_materia, fecha, hora_inicio, hora_fin, estado } = req.body;

        const actualizarReserva = await Reservas.editarTurno(id_reserva, id_alumno, id_profesor, id_materia, fecha, hora_inicio, hora_fin, estado);
        res.json(actualizarReserva);
    } catch (error) {
        res.status(500).json({ error: 'error para actualizar una reserva' });
    }
}

//CANCELAR RESERVA
exports.cancelReserva = async (req, res) => {
    try {
        const id_reserva  = req.params.id_reserva;

        const borrarTurno = await Reservas.cancelarTurno(id_reserva);
        res.json(borrarTurno);
    } catch (error) {
        res.status(500).json({ message: 'Error al cancelar turno', error });
    }             
};

//LISTAR RESERVA POR ID
exports.reservas = async (req, res) => {
    try{
        const listaReservas = await Reservas.reservasPorId(id_alumno);
        res.json(listaReservas);
    } catch (error){
        res.status(500).json({error: 'Error al listar las reservas'});
    }
}