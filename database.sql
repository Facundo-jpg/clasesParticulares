-- Base de datos para Sistema de Clases Particulares
CREATE DATABASE IF NOT EXISTS clasesparticulares;
USE clasesparticulares;

-- Tabla de Usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('estudiante', 'profesor', 'admin') NOT NULL DEFAULT 'estudiante',
    foto_perfil VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo'
);

-- Tabla de Materias
CREATE TABLE materias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    nivel ENUM('primario', 'secundario', 'universitario', 'todos') DEFAULT 'todos',
    estado ENUM('activo', 'inactivo') DEFAULT 'activo'
);

-- Tabla de Profesor-Materia (relación muchos a muchos)
CREATE TABLE profesor_materia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_profesor INT NOT NULL,
    id_materia INT NOT NULL,
    precio_hora DECIMAL(10,2) NOT NULL,
    modalidad ENUM('online', 'presencial', 'ambas') DEFAULT 'ambas',
    descripcion_profesor TEXT,
    FOREIGN KEY (id_profesor) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_materia) REFERENCES materias(id) ON DELETE CASCADE,
    UNIQUE KEY unique_profesor_materia (id_profesor, id_materia)
);

-- Tabla de Clases/Reservas
CREATE TABLE clases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_alumno INT NOT NULL,
    id_profesor INT NOT NULL,
    id_materia INT NOT NULL,
    fecha_clase DATETIME NOT NULL,
    duracion_minutos INT DEFAULT 60,
    modalidad ENUM('online', 'presencial') NOT NULL,
    estado ENUM('pendiente', 'confirmada', 'realizada', 'cancelada', 'disponible') DEFAULT 'pendiente',
    link_online VARCHAR(255),
    direccion VARCHAR(255),
    precio_hora DECIMAL(10,2),
    notas TEXT,
    calificacion_alumno INT,
    calificacion_profesor INT,
    comentario_alumno TEXT,
    comentario_profesor TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_alumno) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_profesor) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_materia) REFERENCES materias(id) ON DELETE CASCADE
);

-- Tabla de Pagos
CREATE TABLE pagos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_clase INT NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    metodo_pago ENUM('efectivo', 'transferencia', 'mercadopago', 'otro') NOT NULL,
    estado_pago ENUM('pendiente', 'completado', 'fallido') DEFAULT 'pendiente',
    fecha_pago TIMESTAMP,
    comprobante VARCHAR(255),
    FOREIGN KEY (id_clase) REFERENCES clases(id) ON DELETE CASCADE
);

-- Tabla de Disponibilidad de Profesores
CREATE TABLE disponibilidad_profesor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_profesor INT NOT NULL,
    dia_semana ENUM('lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo') NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    estado ENUM('disponible', 'ocupado') DEFAULT 'disponible',
    FOREIGN KEY (id_profesor) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de Mensajes/Chat
CREATE TABLE mensajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_remitente INT NOT NULL,
    id_destinatario INT NOT NULL,
    id_clase INT NULL,
    mensaje TEXT NOT NULL,
    leido BOOLEAN DEFAULT FALSE,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_remitente) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_destinatario) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_clase) REFERENCES clases(id) ON DELETE SET NULL
);

-- Tabla de Notificaciones
CREATE TABLE notificaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    tipo ENUM('nueva_clase', 'clase_cancelada', 'clase_confirmada', 'mensaje', 'pago', 'calificacion') NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    mensaje TEXT NOT NULL,
    leida BOOLEAN DEFAULT FALSE,
    id_referencia INT NULL, -- ID de la clase, mensaje, etc.
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Índices para mejor rendimiento
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_clases_alumno ON clases(id_alumno);
CREATE INDEX idx_clases_profesor ON clases(id_profesor);
CREATE INDEX idx_clases_fecha ON clases(fecha_clase);
CREATE INDEX idx_mensajes_usuarios ON mensajes(id_remitente, id_destinatario);
CREATE INDEX idx_disponibilidad_profesor ON disponibilidad_profesor(id_profesor, dia_semana);

-- Datos de ejemplo
INSERT INTO materias (nombre, descripcion, nivel) VALUES
('Matemática', 'Álgebra, geometría, cálculo, estadística', 'todos'),
('Física', 'Mecánica, termodinámica, electromagnetismo', 'secundario'),
('Química', 'Química orgánica, inorgánica, analítica', 'secundario'),
('Programación', 'HTML, CSS, JavaScript, Python, Java', 'todos'),
('Inglés', 'Gramática, conversación, preparación exámenes', 'todos'),
('Historia', 'Historia universal, argentina, arte', 'secundario'),
('Biología', 'Biología celular, genética, ecología', 'secundario'),
('Economía', 'Microeconomía, macroeconomía, finanzas', 'universitario');

-- Usuarios de ejemplo
INSERT INTO usuarios (nombre, apellido, email, telefono, password, rol) VALUES
('Juan', 'Pérez', 'juan.profesor@email.com', '1122334455', 'password123', 'profesor'),
('María', 'Gómez', 'maria.alumna@email.com', '1155667788', 'password123', 'estudiante'),
('Carlos', 'Rodríguez', 'carlos.admin@email.com', '1199887766', 'admin123', 'admin'),
('Ana', 'López', 'ana.profesora@email.com', '1144556677', 'password123', 'profesor'),
('Pedro', 'Martínez', 'pedro.alumno@email.com', '1133445566', 'password123', 'estudiante');

-- Disponibilidad de ejemplo para el profesor
INSERT INTO disponibilidad_profesor (id_profesor, dia_semana, hora_inicio, hora_fin) VALUES
(1, 'lunes', '09:00:00', '18:00:00'),
(1, 'martes', '09:00:00', '18:00:00'),
(1, 'miercoles', '14:00:00', '20:00:00'),
(1, 'jueves', '09:00:00', '18:00:00'),
(1, 'viernes', '09:00:00', '15:00:00');

-- Materias que dicta el profesor Juan
INSERT INTO profesor_materia (id_profesor, id_materia, precio_hora, modalidad, descripcion_profesor) VALUES
(1, 1, 1500.00, 'ambas', 'Ingeniero con 10 años de experiencia en matemática'),
(1, 2, 1800.00, 'online', 'Profesor de física con especialización en secundario'),
(1, 4, 2000.00, 'online', 'Desarrollador full stack, experto en programación web');

-- Materias que dicta la profesora Ana
INSERT INTO profesor_materia (id_profesor, id_materia, precio_hora, modalidad, descripcion_profesor) VALUES
(4, 5, 1600.00, 'ambas', 'Profesora nativa de inglés con certificación TEFL'),
(4, 6, 1400.00, 'presencial', 'Licenciada en Historia, especialista en historia argentina'),
(4, 7, 1700.00, 'online', 'Bióloga con maestría en genética');

-- Clases de ejemplo (algunas confirmadas, otras disponibles)
INSERT INTO clases (id_alumno, id_profesor, id_materia, fecha_clase, duracion_minutos, modalidad, estado, precio_hora, link_online) VALUES
-- Clases confirmadas
(2, 1, 1, '2025-02-20 16:00:00', 60, 'online', 'confirmada', 1500.00, 'https://meet.google.com/abc-defg-hij'),
(5, 4, 5, '2025-02-21 10:00:00', 90, 'online', 'confirmada', 1600.00, 'https://zoom.us/j/123456789'),
-- Clases disponibles para que los alumnos se unan
(NULL, 1, 1, '2025-02-25 15:00:00', 60, 'online', 'disponible', 1500.00, 'https://meet.google.com/xyz-abcd-efg'),
(NULL, 1, 2, '2025-02-26 17:00:00', 90, 'online', 'disponible', 1800.00, 'https://meet.google.com/klm-nopq-rst'),
(NULL, 1, 4, '2025-02-27 19:00:00', 120, 'online', 'disponible', 2000.00, 'https://meet.google.com/uvw-xyz-abc'),
(NULL, 4, 5, '2025-02-28 11:00:00', 60, 'online', 'disponible', 1600.00, 'https://zoom.us/j/987654321'),
(NULL, 4, 6, '2025-03-01 14:00:00', 90, 'presencial', 'disponible', 1400.00, NULL),
(NULL, 4, 7, '2025-03-02 16:00:00', 60, 'online', 'disponible', 1700.00, 'https://meet.google.com/bio-class-123');