const Materias = require('../models/materiasModels');

//LISTAR MATERIAS
exports.listarMaterias = async (req, res) => {
    try {
        const materias = await Materias.listarMaterias();
        res.json(materias);
    } catch (error) {
        console.error('Error al listar materias:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

//OBTENER MATERIA
exports.getMateria = async (req, res) => {
    try {
        const { id } = req.params;
        const materia = await Materias.getMateriaById(id);

        if (!materia) {
            return res.status(404).json({ error: 'Materia no encontrada' });
        }

        res.json(materia);
    } catch (error) {
        console.error('Error al obtener materia:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

//CREAR MATERIA
exports.crearMateria = async (req, res) => {
    try {
        const { nombre, descripcion, nivel } = req.body;

        if (!nombre) {
            return res.status(400).json({ error: 'El nombre es requerido' });
        }

        const nuevaMateria = await Materias.crearMateria(nombre, descripcion, nivel);
        res.status(201).json({ message: 'Materia creada exitosamente', materia: nuevaMateria });
    } catch (error) {
        console.error('Error al crear materia:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

//OBTENER MATERIAS POR PROFESOR
exports.getMateriasPorProfesor = async (req, res) => {
    try {
        const { id_profesor } = req.params;
        const materias = await Materias.getMateriasPorProfesor(id_profesor);
        res.json(materias);
    } catch (error) {
        console.error('Error al obtener materias del profesor:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

//OBTENER PROFESORES POR MATERIA
exports.getProfesoresPorMateria = async (req, res) => {
    try {
        const { id_materia } = req.params;
        const profesores = await Materias.getProfesoresPorMateria(id_materia);
        res.json(profesores);
    } catch (error) {
        console.error('Error al obtener profesores de la materia:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}