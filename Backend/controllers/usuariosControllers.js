const Usuarios = require('../models/usuariosModels');

//LOGIN
exports.loginUsuario = async (req, res) => {
    try{
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Faltan email o contraseña" });
        }

        const user = await Usuarios.buscarUsuario(email, password);

        if (!user) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        res.json({message: 'Login exitoso', user});
    } catch (error){
        console.error('Error en login:', error);
        res.status(500).json({error: 'Error en el servidor'});
    }
}

//REGISTRO
exports.nuevoUser = async (req, res) => {
    try{
        const {nombre, apellido, telefono, password, rol, email} = req.body;

        if (!nombre || !apellido || !telefono || !password || !rol || !email) {
            return res.status(400).json({error: 'Todos los campos son requeridos'});
        }

        const emailExiste = await Usuarios.emailExiste(email);
        if (emailExiste) {
            return res.status(400).json({error: 'El email ya está registrado'});
        }

        const newUser = await Usuarios.nuevoUsuario(nombre, apellido, telefono, password, rol, email);
        res.status(201).json({message: 'Usuario creado exitosamente', user: newUser});
    } catch (error){
        console.error('Error en registro:', error);
        console.error('Stack:', error.stack);
        res.status(500).json({error: error.message || 'Error al registrar usuario'});
    }
}

//OBTENER USUARIO
exports.getUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuarios.getUsuarioById(id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(usuario);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

//ACTUALIZAR USUARIO
exports.actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        const usuarioActualizado = await Usuarios.actualizarUsuario(id, datos);

        if (!usuarioActualizado) {
            return res.status(404).json({ error: 'Usuario no encontrado o no se pudo actualizar' });
        }

        res.json({ message: 'Usuario actualizado exitosamente', usuario: usuarioActualizado });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

//LISTAR PROFESORES
exports.listarProfesores = async (req, res) => {
    try {
        const profesores = await Usuarios.listarProfesores();
        res.json(profesores);
    } catch (error) {
        console.error('Error al listar profesores:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}