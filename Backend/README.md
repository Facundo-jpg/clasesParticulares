# Backend - Sistema de Clases Particulares

## Configuración de la Base de Datos

### 1. Crear la base de datos

Ejecuta el archivo SQL en MySQL:

```bash
mysql -u root -p < ../database.sql
```

O desde MySQL Workbench/phpMyAdmin, importa el archivo `database.sql` (ubicado en la raíz del proyecto)

### 2. Configurar variables de entorno

El archivo `.env` ya está configurado con valores por defecto:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=clasesparticulares
PORT=3000
```

**Importante:** Si tu MySQL tiene contraseña, actualiza `DB_PASSWORD` en el archivo `.env`

### 3. Instalar dependencias

```bash
npm install
```

### 4. Iniciar el servidor

**Modo desarrollo (con nodemon):**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

## Endpoints de la API

### Usuarios
- `POST /api/usuarios/login` - Iniciar sesión
- `POST /api/usuarios/registro` - Registrar usuario
- `GET /api/usuarios/profesores` - Listar profesores

### Materias
- `GET /api/materias` - Listar todas las materias
- `GET /api/materias/:id` - Obtener materia por ID
- `POST /api/materias` - Crear materia
- `PUT /api/materias/:id` - Actualizar materia
- `DELETE /api/materias/:id` - Eliminar materia

### Clases
- `GET /api/clases/profesor/:id` - Clases de un profesor
- `GET /api/clases/alumno/:id` - Clases de un alumno
- `GET /api/clases/disponibles` - Clases disponibles
- `POST /api/clases` - Crear clase
- `PUT /api/clases/:id` - Actualizar clase
- `PUT /api/clases/:id/confirmar` - Confirmar clase
- `PUT /api/clases/:id/cancelar` - Cancelar clase
- `PUT /api/clases/:id/realizar` - Marcar como realizada
- `PUT /api/clases/:id/calificar` - Calificar clase
- `PUT /api/clases/:id/inscribir` - Inscribir alumno
- `DELETE /api/clases/:id` - Eliminar clase

### Reservas
- `POST /api/reservas/crearReserva` - Crear reserva
- `GET /api/reservas/listarReserva/:id_alumno` - Listar reservas
- `PUT /api/reservas/actualizarReserva/:id` - Actualizar reserva
- `DELETE /api/reservas/eliminarReserva/:id_reserva` - Eliminar reserva

## Documentación API

Accede a la documentación interactiva de Swagger en:
`http://localhost:3000/docs`

## Estructura del Proyecto

```
Backend/
├── config/
│   ├── db.js              # Configuración de MySQL
│   └── swaggerConfig.js   # Configuración de Swagger
├── controllers/           # Lógica de negocio
├── models/               # Modelos de datos
├── routes/               # Rutas de la API
├── .env                  # Variables de entorno
├── app.js                # Configuración de Express
├── server.js             # Servidor principal
└── README.md             # Este archivo
```

## Solución de Problemas

### Error de conexión a MySQL

1. Verifica que MySQL esté corriendo
2. Verifica las credenciales en `.env`
3. Asegúrate de que la base de datos `clasesparticulares` exista

### Puerto en uso

Si el puerto 3000 está ocupado, cambia `PORT` en `.env`

### CORS Error

El backend está configurado para aceptar peticiones desde `http://localhost:5173` (Frontend)
