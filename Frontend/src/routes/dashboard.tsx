import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clasesAPI, authAPI, materiasAPI } from "../services/api.js";
import { useAuth } from "../auth/auth-provider.tsx";
import DashboardAlumno from "./dashboard-alumno.tsx";
import "./dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [clases, setClases] = useState([]);
  const [clasesRecibidas, setClasesRecibidas] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [showNewClaseForm, setShowNewClaseForm] = useState(false);
  const [editingClase, setEditingClase] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.id) {
          // Cargar datos según el rol
          if (user.rol === 'profesor') {
            // Cargar clases como profesor
            const clasesProfesorResponse = await clasesAPI.listarPorProfesor(user.id);
            setClases(clasesProfesorResponse);

            // Cargar materias que enseña el profesor
            try {
              const materiasResponse = await materiasAPI.getMateriasPorProfesor(user.id);
              setMaterias(materiasResponse);
            } catch (e) {
              // Si no tiene materias asignadas, cargar todas
              const allMaterias = await materiasAPI.listar();
              setMaterias(allMaterias);
            }
          } else {
            // Es estudiante
            const clasesAlumnoResponse = await clasesAPI.listarPorAlumno(user.id);
            setClases(clasesAlumnoResponse);

            const profesoresResponse = await authAPI.getProfesores();
            setProfesores(profesoresResponse);

            const materiasResponse = await materiasAPI.listar();
            setMaterias(materiasResponse);
          }
        }
      } catch (err) {
        setError('Error al cargar los datos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    auth.logOut();
  };

  const handleCrearClase = async (claseData) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      // Si es profesor, crear la clase con su ID como profesor
      if (user.rol === 'profesor') {
        claseData.id_profesor = user.id;
        claseData.id_alumno = editingClase?.id_alumno || null; // Si está editando, mantener el alumno

        if (editingClase) {
          // Modificar clase existente
          const claseModificada = await clasesAPI.actualizar(editingClase.id, claseData);
          setClases(clases.map(c => c.id === editingClase.id ? claseModificada : c));
          setEditingClase(null);
          alert('Clase modificada exitosamente');
        } else {
          // Crear nueva clase (disponible para que los alumnos se inscriban)
          if (!claseData.fecha_clase || !claseData.id_materia) {
            alert('Por favor complete la fecha y la materia');
            return;
          }

          const nuevaClase = await clasesAPI.crear({
            ...claseData,
            id_alumno: 1 // Temporal hasta que un alumno se inscriba
          });
          setClases([...clases, nuevaClase.clase]);
          alert('Clase creada exitosamente. Ahora está disponible para que los alumnos se inscriban.');
        }
      } else {
        // Es estudiante
        const nuevaClase = await clasesAPI.crear(claseData);
        setClases([...clases, nuevaClase.clase]);
      }

      setShowNewClaseForm(false);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleCancelarClase = async (id) => {
    if (!confirm('¿Está seguro de que desea cancelar esta clase?')) return;

    try {
      await clasesAPI.cancelar(id);
      setClases(clases.map(clase =>
        clase.id === id ? {...clase, estado: 'cancelada'} : clase
      ));
      alert('Clase cancelada');
    } catch (error) {
      alert('Error al cancelar clase: ' + error.message);
    }
  };

  const handleConfirmarClase = async (id) => {
    try {
      await clasesAPI.confirmar(id);
      setClases(clases.map(clase =>
        clase.id === id ? {...clase, estado: 'confirmada'} : clase
      ));
      alert('Clase confirmada');
    } catch (error) {
      alert('Error al confirmar clase: ' + error.message);
    }
  };

  const handleMarcarRealizada = async (id) => {
    try {
      await clasesAPI.marcarRealizada(id);
      setClases(clases.map(clase =>
        clase.id === id ? {...clase, estado: 'realizada'} : clase
      ));
      alert('Clase marcada como realizada');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleCalificar = async (id, calificacion, comentario) => {
    try {
      await clasesAPI.calificar(id, { calificacion, comentario });
      setClases(clases.map(clase =>
        clase.id === id ? {...clase, calificacion_alumno: calificacion, comentario_alumno: comentario} : clase
      ));
      alert('Clase calificada');
    } catch (error) {
      alert('Error al calificar: ' + error.message);
    }
  };

  const handleEditarClase = (clase) => {
    setEditingClase(clase);
    setShowNewClaseForm(true);
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Componente para nueva/editar clase
  const NewClaseForm = () => {
    const [formData, setFormData] = useState({
      id_profesor: editingClase?.id_profesor || '',
      id_materia: editingClase?.id_materia || '',
      fecha_clase: editingClase?.fecha_clase?.slice(0, 16) || '',
      duracion_minutos: editingClase?.duracion_minutos || 60,
      modalidad: editingClase?.modalidad || 'online',
      link_online: editingClase?.link_online || '',
      direccion: editingClase?.direccion || '',
      precio_hora: editingClase?.precio_hora || ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      handleCrearClase(formData);
    };

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>{editingClase ? 'Modificar Clase' : user.rol === 'profesor' ? 'Crear Nueva Clase' : 'Reservar Clase'}</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="datetime-local"
              placeholder="Fecha y hora"
              value={formData.fecha_clase}
              onChange={(e) => setFormData({...formData, fecha_clase: e.target.value})}
              required
            />

            {user.rol === 'estudiante' && (
              <>
                <select
                  value={formData.id_profesor}
                  onChange={(e) => setFormData({...formData, id_profesor: e.target.value})}
                  required
                >
                  <option value="">Seleccionar Profesor</option>
                  {profesores.map(prof => (
                    <option key={prof.id} value={prof.id}>
                      {prof.nombre} {prof.apellido}
                    </option>
                  ))}
                </select>
              </>
            )}

            <select
              value={formData.id_materia}
              onChange={(e) => setFormData({...formData, id_materia: e.target.value})}
              required
            >
              <option value="">Seleccionar Materia</option>
              {materias.map(materia => (
                <option key={materia.id} value={materia.id}>
                  {materia.nombre}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Duración (minutos)"
              value={formData.duracion_minutos}
              onChange={(e) => setFormData({...formData, duracion_minutos: parseInt(e.target.value)})}
              min="30"
              step="30"
            />

            {user.rol === 'profesor' && (
              <input
                type="number"
                placeholder="Precio por hora"
                value={formData.precio_hora}
                onChange={(e) => setFormData({...formData, precio_hora: parseFloat(e.target.value)})}
                min="0"
                step="0.01"
              />
            )}

            <select
              value={formData.modalidad}
              onChange={(e) => setFormData({...formData, modalidad: e.target.value})}
            >
              <option value="online">Online</option>
              <option value="presencial">Presencial</option>
            </select>

            {formData.modalidad === 'online' ? (
              <input
                type="url"
                placeholder="Link de la clase (Zoom, Meet, etc.)"
                value={formData.link_online}
                onChange={(e) => setFormData({...formData, link_online: e.target.value})}
              />
            ) : (
              <input
                type="text"
                placeholder="Dirección de la clase"
                value={formData.direccion}
                onChange={(e) => setFormData({...formData, direccion: e.target.value})}
              />
            )}

            <div className="modal-buttons">
              <button type="submit" className="btn-primary">
                {editingClase ? 'Guardar Cambios' : user.rol === 'profesor' ? 'Crear Clase' : 'Reservar'}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setShowNewClaseForm(false);
                  setEditingClase(null);
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Componente de calificación
  const CalificacionModal = ({ clase, onClose }) => {
    const [calificacion, setCalificacion] = useState(5);
    const [comentario, setComentario] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      handleCalificar(clase.id, calificacion, comentario);
      onClose();
    };

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>Calificar Clase</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Calificación (1-10):</label>
              <input
                type="number"
                min="1"
                max="10"
                value={calificacion}
                onChange={(e) => setCalificacion(parseInt(e.target.value))}
                required
              />
            </div>
            <div className="form-group">
              <label>Comentario:</label>
              <textarea
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                rows="4"
              ></textarea>
            </div>
            <div className="modal-buttons">
              <button type="submit" className="btn-primary">Enviar Calificación</button>
              <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;

  // Si es estudiante, usar el dashboard específico para alumnos
  if (user.rol === 'estudiante') {
    return <DashboardAlumno />;
  }

  // Si es profesor o admin, usar el dashboard general
  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-brand">
          <h1>EduControl</h1>
        </div>
        <div className="header-user">
          <div className="user-info">
            <div className="user-name">{user.nombre} {user.apellido}</div>
            <div className="user-role">{user.rol === 'profesor' ? 'Profesor' : 'Estudiante'}</div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>

      {/* Navigation */}
      <div className="dashboard-nav">
        <button
          className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          {user.rol === 'profesor' ? 'Mis Clases' : 'Mis Reservas'}
        </button>
        {user.rol === 'estudiante' && (
          <button
            className={`nav-btn ${activeTab === 'explore' ? 'active' : ''}`}
            onClick={() => setActiveTab('explore')}
          >
            Explorar Clases
          </button>
        )}
        <button
          className={`nav-btn ${activeTab === 'schedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          Calendario
        </button>
        <button
          className="nav-btn"
          onClick={() => navigate('/settings')}
        >
          ⚙️ Ajustes
        </button>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {activeTab === 'overview' && (
          <>
            <div className="section-header">
              <h2>
                {user.rol === 'profesor'
                  ? 'Gestión de Clases'
                  : 'Mis Clases Reservadas'
                }
              </h2>
              {user.rol === 'profesor' && (
                <button
                  className="add-btn"
                  onClick={() => setShowNewClaseForm(true)}
                >
                  Crear Nueva Clase
                </button>
              )}
            </div>

            <div className="classes-grid">
              {clases.length === 0 ? (
                <div className="empty-state">
                  <p>
                    {user.rol === 'profesor'
                      ? 'No tienes clases creadas. ¡Crea una nueva!'
                      : 'No tienes clases reservadas. ¡Explora las disponibles!'
                    }
                  </p>
                </div>
              ) : (
                clases.map(clase => (
                  <div key={clase.id} className="class-card">
                    <div className="class-header">
                      <h3>{clase.materia_nombre}</h3>
                      <span className={`class-status ${clase.estado}`}>
                        {clase.estado}
                      </span>
                    </div>
                    <div className="class-details">
                      {user.rol === 'profesor' ? (
                        <p><strong>Alumno:</strong> {clase.alumno_nombre} {clase.alumno_apellido}</p>
                      ) : (
                        <p><strong>Profesor:</strong> {clase.profesor_nombre} {clase.profesor_apellido}</p>
                      )}
                      <p><strong>Fecha:</strong> {new Date(clase.fecha_clase).toLocaleDateString()}</p>
                      <p><strong>Hora:</strong> {new Date(clase.fecha_clase).toLocaleTimeString()}</p>
                      <p><strong>Duración:</strong> {clase.duracion_minutos} minutos</p>
                      <p><strong>Modalidad:</strong> {clase.modalidad}</p>
                      {clase.modalidad === 'online' && clase.link_online && (
                        <p><strong>Link:</strong> <a href={clase.link_online} target="_blank" rel="noopener noreferrer">Unirse a la clase</a></p>
                      )}
                      {clase.precio_hora && (
                        <p><strong>Precio:</strong> ${clase.precio_hora}/hora</p>
                      )}
                    </div>
                    <div className="class-actions">
                      {user.rol === 'profesor' ? (
                        <>
                          {clase.estado === 'pendiente' && (
                            <>
                              <button
                                className="btn-confirm"
                                onClick={() => handleConfirmarClase(clase.id)}
                              >
                                Aceptar Alumno
                              </button>
                              <button
                                className="btn-cancel"
                                onClick={() => handleCancelarClase(clase.id)}
                              >
                                Rechazar
                              </button>
                            </>
                          )}
                          {clase.estado === 'confirmada' && (
                            <>
                              <button
                                className="btn-confirm"
                                onClick={() => handleEditarClase(clase)}
                              >
                                Modificar
                              </button>
                              <button
                                className="btn-confirm"
                                onClick={() => handleMarcarRealizada(clase.id)}
                              >
                                Marcar Realizada
                              </button>
                            </>
                          )}
                          {(clase.estado === 'confirmada' || clase.estado === 'realizada') && (
                            <button
                              className="btn-cancel"
                              onClick={() => handleCancelarClase(clase.id)}
                            >
                              Cancelar
                            </button>
                          )}
                        </>
                      ) : (
                        <>
                          {clase.estado === 'pendiente' && (
                            <button
                              className="btn-cancel"
                              onClick={() => handleCancelarClase(clase.id)}
                            >
                              Cancelar Reserva
                            </button>
                          )}
                          {clase.estado === 'realizada' && !clase.calificacion_alumno && (
                            <CalificacionModal
                              clase={clase}
                              onClose={() => {}}
                            />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {activeTab === 'explore' && user.rol === 'estudiante' && (
          <div className="explore-section">
            <h2>Explorar Clases Disponibles</h2>
            <div className="empty-state">
              <p>Función de exploración próximamente disponible</p>
              <p>Mientras tanto, usa el botón "Reservar Clase" para solicitar una clase personalizada</p>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="calendar-placeholder">
            <h2>Mi Calendario</h2>
            <p>Visualización del calendario próximamente disponible</p>
          </div>
        )}
      </div>

      {/* Modal para nueva/editar clase */}
      {showNewClaseForm && <NewClaseForm />}
    </div>
  );
}