# EduControl - Sistema de Clases Particulares

Aplicación Full Stack para gestión de clases particulares con Node.js + Express (Backend) y React + TypeScript (Frontend).

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js (v14 o superior)
- MySQL (v5.7 o superior)
- npm o yarn

### Instalación Completa

#### 1. Configurar Base de Datos

```bash
# Desde MySQL o phpMyAdmin, ejecuta:
mysql -u root -p < database.sql
```

O importa el archivo `database.sql` desde phpMyAdmin.

#### 2. Instalar Dependencias

**Backend:**
```bash
cd Backend
npm install
```

**Frontend:**
```bash
cd Frontend
npm install
```

#### 3. Configurar Variables de Entorno

El archivo `Backend/.env` ya está configurado:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=clasesparticulares
PORT=3000
```

**⚠️ Importante:** Si tu MySQL tiene contraseña, actualiza `DB_PASSWORD` en `Backend/.env`

#### 4. Iniciar la Aplicación

**Opción A - Script Automático (Windows):**
```bash
start.bat
```

**Opción B - Manual:**

Terminal 1 (Backend):
```bash
cd Backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd Frontend
npm run dev
```

## 📱 URLs de Acceso

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000
- **Documentación API:** http://localhost:3000/docs

## 🗂️ Estructura del Proyecto

```
clasesParticulares/
├── Backend/                 # API REST con Node.js + Express
│   ├── config/             # Configuración DB y Swagger
│   ├── controllers/        # Lógica de negocio
│   ├── models/            # Modelos de datos
│   ├── routes/            # Rutas de la API
│   ├── .env               # Variables de entorno
│   ├── app.js             # Configuración Express
│   ├── server.js          # Servidor principal
│   └── README.md          # Documentación Backend
│
├── database.sql           # Script de base de datos
│
├── Frontend/               # Aplicación React + TypeScript
│   ├── src/
│   │   ├── auth/          # Autenticación
│   │   ├── layout/        # Layouts
│   │   ├── routes/        # Páginas/Rutas
│   │   └── services/      # Conexión con API
│   └── package.json
│
├── start.bat              # Script para iniciar todo
└── README.md             # Este archivo
```

## 🔑 Usuarios de Prueba

La base de datos incluye usuarios de ejemplo:

**Profesor:**
- Email: `juan.profesor@email.com`
- Password: `password123`

**Estudiante:**
- Email: `maria.alumna@email.com`
- Password: `password123`

**Admin:**
- Email: `carlos.admin@email.com`
- Password: `admin123`

## 📚 API Endpoints

### Usuarios
- `POST /api/usuarios/login` - Iniciar sesión
- `POST /api/usuarios/registro` - Registrar usuario
- `GET /api/usuarios/profesores` - Listar profesores

### Clases
- `GET /api/clases/profesor/:id` - Clases de un profesor
- `GET /api/clases/alumno/:id` - Clases de un alumno
- `GET /api/clases/disponibles` - Clases disponibles
- `POST /api/clases` - Crear clase
- `PUT /api/clases/:id` - Actualizar clase
- `PUT /api/clases/:id/confirmar` - Confirmar clase
- `PUT /api/clases/:id/cancelar` - Cancelar clase
- `PUT /api/clases/:id/realizada` - Marcar como realizada
- `PUT /api/clases/:id/calificar` - Calificar clase
- `POST /api/clases/:id/inscribir` - Inscribir alumno

### Materias
- `GET /api/materias` - Listar materias
- `GET /api/materias/:id` - Obtener materia

## ✨ Características

- ✅ Sistema de autenticación (Login/Registro)
- ✅ Roles de usuario (Estudiante, Profesor, Admin)
- ✅ Gestión de clases y reservas
- ✅ Dashboard para profesores y estudiantes
- ✅ Sistema de calificaciones
- ✅ Clases online y presenciales
- ✅ API REST documentada con Swagger
- ✅ Diseño responsive moderno
- ✅ Landing page atractiva

## 🛠️ Tecnologías

**Backend:**
- Node.js + Express
- MySQL2
- Swagger UI
- dotenv

**Frontend:**
- React 18
- TypeScript
- Vite
- React Router DOM
- CSS Puro

## 🐛 Solución de Problemas

### Error de conexión a MySQL
1. Verifica que MySQL esté corriendo
2. Verifica las credenciales en `Backend/.env`
3. Asegúrate de que la base de datos `clasesparticulares` exista

### Puerto en uso
Si el puerto 3000 o 5173 está ocupado:
- Backend: Cambia `PORT` en `Backend/.env`
- Frontend: Cambia el puerto en `Frontend/vite.config.js`

### CORS Error
El backend está configurado para aceptar peticiones desde `http://localhost:5173`. Si cambias el puerto del frontend, actualiza la configuración CORS en `Backend/app.js`.

### Error al compilar Frontend
```bash
cd Frontend
npm install
npm run build
```

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👥 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias o mejoras.
