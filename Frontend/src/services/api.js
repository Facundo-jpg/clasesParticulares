const API_BASE_URL = 'http://localhost:3000/api';

const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Error en la petición');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Autenticación
export const authAPI = {
  login: (credentials) =>
    apiRequest('/usuarios/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  register: (userData) =>
    apiRequest('/usuarios/registro', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  getUsuario: (id) =>
    apiRequest(`/usuarios/usuario/${id}`),

  actualizarUsuario: (id, datos) =>
    apiRequest(`/usuarios/usuario/${id}`, {
      method: 'PUT',
      body: JSON.stringify(datos),
    }),

  getProfesores: () =>
    apiRequest('/usuarios/profesores'),
};

// Clases
export const clasesAPI = {
  crear: (claseData) =>
    apiRequest('/clases', {
      method: 'POST',
      body: JSON.stringify(claseData),
    }),

  listarDisponibles: (idMateria) =>
    apiRequest(`/clases/disponibles${idMateria ? `?id_materia=${idMateria}` : ''}`),

  inscribir: (idClase, idAlumno) =>
    apiRequest(`/clases/${idClase}/inscribir`, {
      method: 'POST',
      body: JSON.stringify({ id_alumno: idAlumno }),
    }),

  listarPorAlumno: (idAlumno, estado) =>
    apiRequest(`/clases/alumno/${idAlumno}${estado ? `?estado=${estado}` : ''}`),

  listarPorProfesor: (idProfesor, estado) =>
    apiRequest(`/clases/profesor/${idProfesor}${estado ? `?estado=${estado}` : ''}`),

  getClase: (id) =>
    apiRequest(`/clases/${id}`),

  actualizar: (id, claseData) =>
    apiRequest(`/clases/${id}`, {
      method: 'PUT',
      body: JSON.stringify(claseData),
    }),

  confirmar: (id) =>
    apiRequest(`/clases/${id}/confirmar`, {
      method: 'PUT',
    }),

  cancelar: (id) =>
    apiRequest(`/clases/${id}/cancelar`, {
      method: 'PUT',
    }),

  marcarRealizada: (id) =>
    apiRequest(`/clases/${id}/realizada`, {
      method: 'PUT',
    }),

  calificar: (id, calificacionData) =>
    apiRequest(`/clases/${id}/calificar`, {
      method: 'PUT',
      body: JSON.stringify(calificacionData),
    }),
};

// Materias
export const materiasAPI = {
  listar: () =>
    apiRequest('/materias'),

  getMateria: (id) =>
    apiRequest(`/materias/${id}`),

  getProfesoresPorMateria: (idMateria) =>
    apiRequest(`/materias/${idMateria}/profesores`),

  getMateriasPorProfesor: (idProfesor) =>
    apiRequest(`/materias/profesor/${idProfesor}`),
};

export default { authAPI, clasesAPI, materiasAPI };