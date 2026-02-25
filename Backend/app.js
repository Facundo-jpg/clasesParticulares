const express = require('express');
require('dotenv').config();

// Importar rutas
const usuariosRoutes = require('./routes/usuariosRoutes');
const materiasRoutes = require('./routes/materiasRoutes');
const clasesRoutes = require('./routes/clasesRoutes');
const reservasRoutes = require('./routes/reservasRoutes');

// Configuración de Swagger
const swaggerSpec = require('./config/swaggerConfig');
const swaggerUI = require('swagger-ui-express');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configuración de CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Documentación de Swagger
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Rutas de la API
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/materias', materiasRoutes);
app.use('/api/clases', clasesRoutes);
app.use('/api/reservas', reservasRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: 'API funcionando correctamente',
    port: process.env.PORT,
    endpoints: {
      usuarios: '/api/usuarios',
      materias: '/api/materias',
      clases: '/api/clases',
      reservas: '/api/reservas',
      docs: '/docs'
    }
  });
});

// Manejador de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Exportar para uso en server.js
module.exports = app;