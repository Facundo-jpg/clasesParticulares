const express = require('express');
const router = express.Router();

const reservasControllers = require('../controllers/reservasControllers')

/**
 * @swagger
 * tags:
 *   name: Reservas
 *   description: Gestión de Reservas
 */

//CREAR RESERVAS 

/**
 * @swagger
 * /api/reservas/crearReservas:
 *   post:
 *     summary: Permite crear reservas 
 *     tags: [Reservas]
 *     responses:
 *       200:
 *         description: Crea una Reserva
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_alumno:
 *                     type: integer
 *                   id_profesor:
 *                     type: integer
 *                   id_materia:
 *                     type: integer
 *                   fecha:
 *                     type: date
 *                   hora_inicio:
 *                      type: time
 *                   hora_fin:
 *                      type: time
 *                   estado:
 *                      type: string
 */

router.post('/crearReserva', reservasControllers.crearReserva);

//MODIFICAR RESERVAS

/**
 * @swagger
 * /api/reservas/actualizarReserva/:id:
 *   put:
 *     summary: Modificar Reservas
 *     tags: [Reservas]
 *     responses:
 *       200:
 *         description: Permite Modificar una Reserva
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_alumno:
 *                     type: integer
 *                   id_profesor:
 *                     type: integer
 *                   id_materia:
 *                     type: integer
 *                   fecha:
 *                     type: date
 *                   hora_inicio:
 *                      type: time
 *                   hora_fin:
 *                      type: time
 *                   estado:
 *                      type: string
 */

router.put('/actualizarReserva/:id', reservasControllers.modificarTurno);

//CANCELAR RESERVAS

/**
 * @swagger
 * /api/reservas/eliminarReserva/:id_reserva:
 *   delete:
 *     summary: Eliminar reservas
 *     tags: [Reservas]
 *     responses:
 *       200:
 *         description: Permite Modificar una Reserva
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_reserva:
 *                     type: integer
 */


router.delete('/eliminarReserva/:id_reserva', reservasControllers.cancelReserva);

//LISTAR RESERVAS POR ID

/**
 * @swagger
 * /api/reservas/listarReserva/:id_alumno:
 *   get:
 *     summary: Listar Reserva por id
 *     tags: [Reservas]
 *     responses:
 *       200:
 *         description: Permite listar Reserva por id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_reserva:
 *                     type: integer
 */

router.get('/listarReserva/:id_alumno', reservasControllers.reservas);

module.exports = router;