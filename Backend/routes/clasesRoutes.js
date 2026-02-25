const express = require('express');
const router = express.Router();
const clasesControllers = require('../controllers/clasesControllers');

//CREAR CLASE
router.post('/', clasesControllers.crearClase);

//LISTAR CLASES DISPONIBLES
router.get('/disponibles', clasesControllers.listarClasesDisponibles);

//INSCRIBIR ALUMNO EN CLASE
router.post('/:id/inscribir', clasesControllers.inscribirAlumno);

//OBTENER CLASE
router.get('/:id', clasesControllers.getClase);

//LISTAR CLASES POR ALUMNO
router.get('/alumno/:id_alumno', clasesControllers.listarClasesPorAlumno);

//LISTAR CLASES POR PROFESOR
router.get('/profesor/:id_profesor', clasesControllers.listarClasesPorProfesor);

//ACTUALIZAR CLASE
router.put('/:id', clasesControllers.actualizarClase);

//CONFIRMAR CLASE
router.put('/:id/confirmar', clasesControllers.confirmarClase);

//CANCELAR CLASE
router.put('/:id/cancelar', clasesControllers.cancelarClase);

//MARCAR COMO REALIZADA
router.put('/:id/realizada', clasesControllers.marcarRealizada);

//CALIFICAR CLASE
router.put('/:id/calificar', clasesControllers.calificarClase);

module.exports = router;