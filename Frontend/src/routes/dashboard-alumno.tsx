import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clasesAPI, authAPI, materiasAPI } from "../services/api.js";
import { useAuth } from "../auth/auth-provider.tsx";
import "./dashboard.css";

export default function DashboardAlumno() {
  const navigate = useNavigate();
  const [clasesReservadas, setClasesReservadas] = useState([]);
  const [clasesDisponibles, setClasesDisponibles] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [materiaFiltro, setMateriaFiltro] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("mis-clases");
  const [showReservaForm, setShowReservaForm] = useState(false);
  const [selectedClase, setSelectedClase] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.id) {
          // Cargar clases reservadas del alumno
          const reservadasResponse = await clasesAPI.listarPorAlumno(user.id);
          setClasesReservadas(reservadasResponse);

          // Cargar clases disponibles
          const disponiblesResponse = await clasesAPI.listarDisponibles(materiaFiltro);
          setClasesDisponibles(disponiblesResponse);

          // Cargar profesores
          const profesoresResponse = await authAPI.getProfesores();
          setProfesores(profesoresResponse);

          // Cargar materias para filtro
          const materiasResponse = await materiasAPI.listar();
          setMaterias(materiasResponse);
        }
      } catch (err) {
        setError('Error al cargar los datos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [materiaFiltro]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    auth.logOut();
  };

  const handleInscribirClase = async (idClase) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    try {
      await clasesAPI.inscribir(idClase, user.id);

      // Actualizar listas
      const disponiblesResponse = await clasesAPI.listarDisponibles(materiaFiltro);
      setClasesDisponibles(disponiblesResponse);

      const reservadasResponse = await clasesAPI.listarPorAlumno(user.id);
      setClasesReservadas(reservadasResponse);

      alert('Inscripción exitosa. Espera la confirmación del profesor.');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleCancelarClase = async (id) => {
    if (!confirm('¿Está seguro de que desea cancelar esta clase?')) return;

    try {
      await clasesAPI.cancelar(id);

      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const reservadasResponse = await clasesAPI.listarPorAlumno(user.id);
      setClasesReservadas(reservadasResponse);

      alert('Clase cancelada');
    } catch (error) {
      alert('Error al cancelar clase: ' + error.message);
    }
  };

  const handleReservarPersonalizada = async (formData) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const nuevaReserva = await clasesAPI.crear({
        ...formData,
        id_alumno: user.id
      });

      const reservadasResponse = await clasesAPI.listarPorAlumno(user.id);
      setClasesReservadas([...reservadasResponse, nuevaReserva.clase]);

      setShowReservaForm(false);
      alert('Solicitud de clase enviada exitosamente');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Componente para reserva personalizada
  const ReservaPersonalizadaForm = () => {
    const [formData, setFormData] = useState({
      id_profesor: '',
      id_materia: '',
      fecha_clase: '',
      duracion_minutos: 60,
      modalidad: 'online',
      link_online: '',
      direccion: '',
      notas: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      handleReservarPersonalizada(formData);
    };

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>Solicitar Clase Personalizada</h3>
          <form onSubmit={handleSubmit}>
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
              type="datetime-local"
              placeholder="Fecha y hora deseada"
              value={formData.fecha_clase}
              onChange={(e) => setFormData({...formData, fecha_clase: e.target.value})}
              required
            />

            <input
              type="number"
              placeholder="Duración (minutos)"
              value={formData.duracion_minutos}
              onChange={(e) => setFormData({...formData, duracion_minutos: parseInt(e.target.value)})}
              min="30"
              step="30"
            />

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
                placeholder="Preferencia de plataforma (opcional)"
                value={formData.link_online}
                onChange={(e) => setFormData({...formData, link_online: e.target.value})}
              />
            ) : (
              <input
                type="text"
                placeholder="Zona preferida (opcional)"
                value={formData.direccion}
                onChange={(e) => setFormData({...formData, direccion: e.target.value})}
              />
            )}

            <textarea
              placeholder="Comentarios adicionales (temas a ver, nivel, etc.)"
              value={formData.notas}
              onChange={(e) => setFormData({...formData, notas: e.target.value})}
              rows="4"
            ></textarea>

            <div className="modal-buttons">
              <button type="submit" className="btn-primary">Enviar Solicitud</button>
              <button type="button" className="btn-secondary" onClick={() => setShowReservaForm(false)}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;

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
            <div className="user-role">Estudiante</div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>

      {/* Navigation */}
      <div className="dashboard-nav">
        <button
          className={`nav-btn ${activeTab === 'mis-clases' ? 'active' : ''}`}
          onClick={() => setActiveTab('mis-clases')}
        >
          Mis Clases
        </button>
        <button
          className={`nav-btn ${activeTab === 'explorar' ? 'active' : ''}`}
          onClick={() => setActiveTab('explorar')}
        >
          Explorar Clases
        </button>
        <button
          className={`nav-btn ${activeTab === 'profesores' ? 'active' : ''}`}
          onClick={() => setActiveTab('profesores')}
        >
          Profesores
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
        {activeTab === 'mis-clases' && (
          <>
            <div className="section-header">
              <h2>Mis Clases Reservadas</h2>
              <button
                className="add-btn"
                onClick={() => setShowReservaForm(true)}
              >
                Solicitar Clase
              </button>
            </div>

            {clasesReservadas.length === 0 ? (
              <div className="empty-state">
                <p>No tienes clases reservadas aún</p>
                <button className="btn-primary" onClick={() => setActiveTab('explorar')}>
                  Explorar Clases Disponibles
                </button>
              </div>
            ) : (
              <div className="classes-grid">
                {clasesReservadas.map(clase => (
                  <div key={clase.id} className="class-card">
                    <div className="class-header">
                      <h3>{clase.materia_nombre}</h3>
                      <span className={`class-status ${clase.estado}`}>
                        {clase.estado}
                      </span>
                    </div>
                    <div className="class-details">
                      <p><strong>Profesor:</strong> {clase.profesor_nombre} {clase.profesor_apellido}</p>
                      <p><strong>Fecha:</strong> {new Date(clase.fecha_clase).toLocaleDateString()}</p>
                      <p><strong>Hora:</strong> {new Date(clase.fecha_clase).toLocaleTimeString()}</p>
                      <p><strong>Duración:</strong> {clase.duracion_minutos} minutos</p>
                      <p><strong>Modalidad:</strong> {clase.modalidad}</p>
                      {clase.modalidad === 'online' && clase.link_online && (
                        <p><strong>Link:</strong> <a href={clase.link_online} target="_blank" rel="noopener noreferrer">Unirse a la clase</a></p>
                      )}
                      {clase.modalidad === 'presencial' && clase.direccion && (
                        <p><strong>Dirección:</strong> {clase.direccion}</p>
                      )}
                      {clase.precio_hora && (
                        <p><strong>Precio:</strong> ${clase.precio_hora}/hora</p>
                      )}
                    </div>
                    <div className="class-actions">
                      {clase.estado === 'pendiente' && (
                        <button
                          className="btn-cancel"
                          onClick={() => handleCancelarClase(clase.id)}
                        >
                          Cancelar Solicitud
                        </button>
                      )}
                      {clase.estado === 'confirmada' && (
                        <>
                          {clase.modalidad === 'online' && clase.link_online && (
                            <a
                              href={clase.link_online}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-confirm"
                            >
                              Unirse a Clase
                            </a>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'explorar' && (
          <>
            <div className="section-header">
              <h2>Clases Disponibles</h2>
              <div className="filtro-container">
                <select
                  value={materiaFiltro}
                  onChange={(e) => setMateriaFiltro(e.target.value)}
                  className="filtro-select"
                >
                  <option value="">Todas las materias</option>
                  {materias.map(materia => (
                    <option key={materia.id} value={materia.id}>
                      {materia.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {clasesDisponibles.length === 0 ? (
              <div className="empty-state">
                <p>No hay clases disponibles en este momento</p>
                <button className="btn-primary" onClick={() => setShowReservaForm(true)}>
                  Solicitar Clase Personalizada
                </button>
              </div>
            ) : (
              <div className="classes-grid">
                {clasesDisponibles.map(clase => (
                  <div key={clase.id} className="class-card">
                    <div className="class-header">
                      <h3>{clase.materia_nombre}</h3>
                      <span className="class-status disponible">Disponible</span>
                    </div>
                    <div className="class-details">
                      <p><strong>Profesor:</strong> {clase.profesor_nombre} {clase.profesor_apellido}</p>
                      <p><strong>Fecha:</strong> {new Date(clase.fecha_clase).toLocaleDateString()}</p>
                      <p><strong>Hora:</strong> {new Date(clase.fecha_clase).toLocaleTimeString()}</p>
                      <p><strong>Duración:</strong> {clase.duracion_minutos} minutos</p>
                      <p><strong>Modalidad:</strong> {clase.modalidad}</p>
                      {clase.precio_hora && (
                        <p><strong>Precio:</strong> ${clase.precio_hora}/hora</p>
                      )}
                    </div>
                    <div className="class-actions">
                      <button
                        className="btn-primary"
                        onClick={() => handleInscribirClase(clase.id)}
                      >
                        Inscribirme
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'profesores' && (
          <>
            <div className="section-header">
              <h2>Nuestros Profesores</h2>
            </div>

            <div className="profesores-grid">
              {profesores.map(profesor => (
                <div key={profesor.id} className="profesor-card">
                  <div className="profesor-avatar">
                    <span>{profesor.nombre.charAt(0)}{profesor.apellido.charAt(0)}</span>
                  </div>
                  <h3>{profesor.nombre} {profesor.apellido}</h3>
                  <p>Profesor especializado en múltiples materias</p>
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      setSelectedClase({ id_profesor: profesor.id });
                      setShowReservaForm(true);
                    }}
                  >
                    Solicitar Clase
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal para reserva personalizada */}
      {showReservaForm && <ReservaPersonalizadaForm />}
    </div>
  );
}