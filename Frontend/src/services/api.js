const API_URL = 'http://localhost:3000/api';

// Función auxiliar para manejar respuestas
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Error en la petición' }));
    throw new Error(error.error || 'Error en la petición');
  }
  return response.json();
};

// API de Autenticación
export const authAPI = {
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/usuarios/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return handleResponse(response);
  },

  registro: async (userData) => {
    const response = await fetch(`${API_URL}/usuarios/registro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },

  getUsuario: async (id) => {
    const response = await fetch(`${API_URL}/usuarios/usuario/${id}`);
    return handleResponse(response);
  },

  actualizarUsuario: async (id, datos) => {
    const response = await fetch(`${API_URL}/usuarios/usuario/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
    return handleResponse(response);
  },

  getProfesores: async () => {
    const response = await fetch(`${API_URL}/usuarios/profesores`);
    return handleResponse(response);
  }
};

// API de Materias
export const materiasAPI = {
  listar: async () => {
    const response = await fetch(`${API_URL}/materias`);
    return handleResponse(response);
  },

  getMateria: async (id) => {
    const response = await fetch(`${API_URL}/materias/${id}`);
    return handleResponse(response);
  },

  crear: async (materiaData) => {
    const response = await fetch(`${API_URL}/materias`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(materiaData)
    });
    return handleResponse(response);
  },

  getMateriasPorProfesor: async (id_profesor) => {
    const response = await fetch(`${API_URL}/materias/profesor/${id_profesor}`);
    return handleResponse(response);
  },

  getProfesoresPorMateria: async (id_materia) => {
    const response = await fetch(`${API_URL}/materias/${id_materia}/profesores`);
    return handleResponse(response);
  }
};

// API de Clases
export const clasesAPI = {
  crear: async (claseData) => {
    const response = await fetch(`${API_URL}/clases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(claseData)
    });
    return handleResponse(response);
  },

  listarDisponibles: async () => {
    const response = await fetch(`${API_URL}/clases/disponibles`);
    return handleResponse(response);
  },

  inscribirAlumno: async (id_clase, id_alumno) => {
    const response = await fetch(`${API_URL}/clases/${id_clase}/inscribir`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_alumno })
    });
    return handleResponse(response);
  },

  getClase: async (id) => {
    const response = await fetch(`${API_URL}/clases/${id}`);
    return handleResponse(response);
  },

  listarPorAlumno: async (id_alumno) => {
    const response = await fetch(`${API_URL}/clases/alumno/${id_alumno}`);
    return handleResponse(response);
  },

  listarPorProfesor: async (id_profesor) => {
    const response = await fetch(`${API_URL}/clases/profesor/${id_profesor}`);
    return handleResponse(response);
  },

  actualizar: async (id, claseData) => {
    const response = await fetch(`${API_URL}/clases/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(claseData)
    });
    return handleResponse(response);
  },

  confirmar: async (id) => {
    const response = await fetch(`${API_URL}/clases/${id}/confirmar`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    });
    return handleResponse(response);
  },

  cancelar: async (id) => {
    const response = await fetch(`${API_URL}/clases/${id}/cancelar`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    });
    return handleResponse(response);
  },

  marcarRealizada: async (id) => {
    const response = await fetch(`${API_URL}/clases/${id}/realizada`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    });
    return handleResponse(response);
  },

  calificar: async (id, calificacionData) => {
    const response = await fetch(`${API_URL}/clases/${id}/calificar`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(calificacionData)
    });
    return handleResponse(response);
  }
};

// API de Reservas (si se necesita en el futuro)
export const reservasAPI = {
  // Aquí se pueden agregar endpoints de reservas si existen
};
