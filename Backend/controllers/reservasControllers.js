const Reservas = require('../models/reservasModels');

//CREAR RESERVAS
exports.crearReserva = async (req, res) => {
    try {
        const { id_alumno, id_profesor, id_materia, fecha, hora_inicio, hora_fin, estado } = req.body;

        if (!id_alumno || !id_profesor || !id_materia || !fecha || !hora_inicio || !hora_fin) {
            return res.status(400).json({ error: 'Faltan datos requeridos' });
        }

        const nuevaReserva = await Reservas.crearTurno(id_alumno, id_profesor, id_materia, fecha, hora_inicio, hora_fin, estado || 'pendiente');
        res.status(201).json({ message: 'Reserva creada exitosamente', nuevaReserva });
    } catch (error) {
        console.error('Error al crear reserva:', error);
        res.status(500).json({ error: 'Error al crear la reserva' });
    }
}   

//MODIFICAR RESERVA
exports.modificarTurno = async (req, res) => {
    try {
        const id_reserva = req.params.id;
        const { id_alumno, id_profesor, id_materia, fecha, hora_inicio, hora_fin, estado } = req.body;

        if (!id_reserva) {
            return res.status(400).json({ error: 'ID de reserva requerido' });
        }

        const actualizarReserva = await Reservas.editarTurno(id_reserva, id_alumno, id_profesor, id_materia, fecha, hora_inicio, hora_fin, estado);
        
        if (actualizarReserva.affectedRows === 0) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }

        res.json({ message: 'Reserva actualizada exitosamente' });
    } catch (error) {
        console.error('Error al actualizar reserva:', error);
        res.status(500).json({ error: 'Error al actualizar la reserva' });
    }
}

//CANCELAR RESERVA
exports.cancelReserva = async (req, res) => {
    try {
        const { id_reserva } = req.params;

        if (!id_reserva) {
            return res.status(400).json({ error: 'ID de reserva requerido' });
        }

        const borrarTurno = await Reservas.cancelarTurno(id_reserva);
        
        if (borrarTurno.affectedRows === 0) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }

        res.json({ message: 'Reserva cancelada exitosamente' });
    } catch (error) {
        console.error('Error al cancelar reserva:', error);
        res.status(500).json({ error: 'Error al cancelar la reserva' });
    }
};

//LISTAR RESERVA POR ID
exports.reservas = async (req, res) => {
    try{
        const { id_alumno } = req.params;
        const listaReservas = await Reservas.reservasPorId(id_alumno);
        res.json(listaReservas);
    } catch (error){
        res.status(500).json({error: 'Error al listar las reservas'});
    }
}