const Clases = require('../models/clasesModels');

//CREAR CLASE
exports.crearClase = async (req, res) => {
    try {
        const datos = req.body;

        // Si es un profesor creando una clase, no requiere alumno
        if (!datos.id_profesor || !datos.id_materia || !datos.fecha_clase) {
            return res.status(400).json({ error: 'Faltan datos requeridos: profesor, materia o fecha' });
        }

        const nuevaClase = await Clases.crearClase(datos);
        res.status(201).json({ message: 'Clase creada exitosamente', clase: nuevaClase });
    } catch (error) {
        console.error('Error al crear clase:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

//INSCRIBIR ALUMNO EN CLASE DISPONIBLE
exports.inscribirAlumno = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_alumno } = req.body;

        if (!id_alumno) {
            return res.status(400).json({ error: 'El ID del alumno es requerido' });
        }

        const clase = await Clases.inscribirAlumno(id, id_alumno);
        res.json({ message: 'Inscripción exitosa', clase });
    } catch (error) {
        console.error('Error al inscribir alumno:', error);
        res.status(400).json({ error: error.message });
    }
}

//LISTAR CLASES DISPONIBLES
exports.listarClasesDisponibles = async (req, res) => {
    try {
        const { id_materia } = req.query;
        const clases = await Clases.listarClasesDisponibles(id_materia);
        res.json(clases);
    } catch (error) {
        console.error('Error al listar clases disponibles:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

//OBTENER CLASE
exports.getClase = async (req, res) => {
    try {
        const { id } = req.params;
        const clase = await Clases.getClaseById(id);

        if (!clase) {
            return res.status(404).json({ error: 'Clase no encontrada' });
        }

        res.json(clase);
    } catch (error) {
        console.error('Error al obtener clase:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

//LISTAR CLASES POR ALUMNO
exports.listarClasesPorAlumno = async (req, res) => {
    try {
        const { id_alumno } = req.params;
        const { estado } = req.query;
        const clases = await Clases.listarClasesPorAlumno(id_alumno, estado);
        res.json(clases);
    } catch (error) {
        console.error('Error al listar clases del alumno:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

//LISTAR CLASES POR PROFESOR
exports.listarClasesPorProfesor = async (req, res) => {
    try {
        const { id_profesor } = req.params;
        const { estado } = req.query;
        const clases = await Clases.listarClasesPorProfesor(id_profesor, estado);
        res.json(clases);
    } catch (error) {
        console.error('Error al listar clases del profesor:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

//ACTUALIZAR CLASE
exports.actualizarClase = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        const claseActualizada = await Clases.actualizarClase(id, datos);

        if (!claseActualizada) {
            return res.status(404).json({ error: 'Clase no encontrada o no se pudo actualizar' });
        }

        res.json({ message: 'Clase actualizada exitosamente', clase: claseActualizada });
    } catch (error) {
        console.error('Error al actualizar clase:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

//CONFIRMAR CLASE
exports.confirmarClase = async (req, res) => {
    try {
        const { id } = req.params;
        const confirmada = await Clases.confirmarClase(id);

        if (!confirmada) {
            return res.status(404).json({ error: 'Clase no encontrada' });
        }

        res.json({ message: 'Clase confirmada exitosamente' });
    } catch (error) {
        console.error('Error al confirmar clase:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

//CANCELAR CLASE
exports.cancelarClase = async (req, res) => {
    try {
        const { id } = req.params;
        const cancelada = await Clases.cancelarClase(id);

        if (!cancelada) {
            return res.status(404).json({ error: 'Clase no encontrada' });
        }

        res.json({ message: 'Clase cancelada exitosamente' });
    } catch (error) {
        console.error('Error al cancelar clase:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

//MARCAR COMO REALIZADA
exports.marcarRealizada = async (req, res) => {
    try {
        const { id } = req.params;
        const realizada = await Clases.marcarRealizada(id);

        if (!realizada) {
            return res.status(404).json({ error: 'Clase no encontrada' });
        }

        res.json({ message: 'Clase marcada como realizada' });
    } catch (error) {
        console.error('Error al marcar clase como realizada:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

//CALIFICAR CLASE
exports.calificarClase = async (req, res) => {
    try {
        const { id } = req.params;
        const { calificacion_alumno, calificacion_profesor, comentario_alumno, comentario_profesor } = req.body;

        if (!calificacion_alumno && !calificacion_profesor) {
            return res.status(400).json({ error: 'Debes proporcionar al menos una calificación' });
        }

        const calificada = await Clases.calificarClase(id, calificacion_alumno, calificacion_profesor, comentario_alumno, comentario_profesor);

        if (!calificada) {
            return res.status(404).json({ error: 'Clase no encontrada' });
        }

        res.json({ message: 'Clase calificada exitosamente' });
    } catch (error) {
        console.error('Error al calificar clase:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}