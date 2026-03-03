const express = require('express');
const router = express.Router();
const materiasControllers = require('../controllers/materiasControllers');

//LISTAR MATERIAS
router.get('/', materiasControllers.listarMaterias);

//OBTENER MATERIAS POR PROFESOR
router.get('/profesor/:id_profesor', materiasControllers.getMateriasPorProfesor);

//OBTENER MATERIA POR ID
router.get('/:id', materiasControllers.getMateria);

//CREAR MATERIA
router.post('/', materiasControllers.crearMateria);

//OBTENER PROFESORES POR MATERIA
router.get('/:id_materia/profesores', materiasControllers.getProfesoresPorMateria);

module.exports = router;