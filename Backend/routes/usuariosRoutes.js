const express = require('express');
const router = express.Router();

const usuariosControllers = require('../controllers/usuariosControllers')

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de Usuarios
 */

//LOGIN

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Permite logearse 
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Login de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   contraseña:
 *                     type: string
 */

router.post('/login', usuariosControllers.loginUsuario);

//REGISTRO

/**
 * @swagger
 * /api/usuarios/registro:
 *   post:
 *     summary: Permite Registrarse 
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Registro de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   apellido:
 *                     type: string
 */

router.post('/registro', usuariosControllers.nuevoUser);

//GET USUARIO
router.get('/usuario/:id', usuariosControllers.getUsuario);

//ACTUALIZAR USUARIO
router.put('/usuario/:id', usuariosControllers.actualizarUsuario);

//LISTAR PROFESORES
router.get('/profesores', usuariosControllers.listarProfesores);

module.exports = router;