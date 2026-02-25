import { useState, useEffect } from 'react';
import { clasesAPI } from '../services/api.js';
import { useAuth } from '../auth/auth-provider.tsx';
import './dashboard.css';

export default function DashboardNew() {
  const [stats, setStats] = useState({
    totalClasses: 0,
    completedClasses: 0,
    pendingClasses: 0,
    nextClass: null
  });
  const [recentClasses, setRecentClasses] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (!user?.id) return;

        const classesResponse = user.rol === 'profesor'
          ? await clasesAPI.listarPorProfesor(user.id)
          : await clasesAPI.listarPorAlumno(user.id);

        const totalClasses = classesResponse.length;
        const completedClasses = classesResponse.filter(c => c.estado === 'realizada').length;
        const pendingClasses = classesResponse.filter(c => c.estado === 'pendiente').length;

        const now = new Date();
        const nextClass = classesResponse
          .filter(c => new Date(c.fecha_clase) > now && c.estado === 'confirmada')
          .sort((a, b) => new Date(a.fecha_clase).getTime() - new Date(b.fecha_clase).getTime())[0];

        setStats({ totalClasses, completedClasses, pendingClasses, nextClass });

        const recent = classesResponse
          .sort((a, b) => new Date(b.fecha_creacion || b.fecha_clase).getTime() - new Date(a.fecha_creacion || a.fecha_clase).getTime())
          .slice(0, 5);
        setRecentClasses(recent);

        const upcoming = classesResponse
          .filter(c => new Date(c.fecha_clase) > now && c.estado !== 'cancelada')
          .sort((a, b) => new Date(a.fecha_clase).getTime() - new Date(b.fecha_clase).getTime())
          .slice(0, 5);
        setUpcomingClasses(upcoming);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.id]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    auth.logOut();
  };

  if (loading) {
    return <div className="loading">Cargando dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-brand">
          <h1>EduControl</h1>
        </div>
        <div className="header-user">
          <div className="user-info">
            <div className="user-name">{user.nombre} {user.apellido}</div>
            <div className="user-role">{user.rol}</div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>

      <div className="dashboard-main">
        <div className="section-header">
          <h2>Dashboard</h2>
        </div>

        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: 'white', padding: '1.5rem', borderRadius: '16px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📚</div>
            <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>{stats.totalClasses}</h3>
            <p style={{ margin: 0, opacity: 0.9 }}>Total de Clases</p>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', padding: '1.5rem', borderRadius: '16px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
            <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>{stats.completedClasses}</h3>
            <p style={{ margin: 0, opacity: 0.9 }}>Completadas</p>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white', padding: '1.5rem', borderRadius: '16px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏳</div>
            <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>{stats.pendingClasses}</h3>
            <p style={{ margin: 0, opacity: 0.9 }}>Pendientes</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ marginTop: 0 }}>Clases Recientes</h3>
            {recentClasses.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {recentClasses.map((clase: any) => (
                  <div key={clase.id} className="class-card">
                    <div className="class-header">
                      <h4>{clase.materia_nombre || 'Clase'}</h4>
                      <span className={`class-status ${clase.estado}`}>{clase.estado}</span>
                    </div>
                    <div className="class-details">
                      <p><strong>Fecha:</strong> {new Date(clase.fecha_clase).toLocaleDateString()}</p>
                      <p><strong>Hora:</strong> {new Date(clase.fecha_clase).toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ textAlign: 'center', color: '#6b7280' }}>No hay clases recientes</p>
            )}
          </div>

          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ marginTop: 0 }}>Próximas Clases</h3>
            {upcomingClasses.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {upcomingClasses.map((clase: any) => (
                  <div key={clase.id} className="class-card">
                    <div className="class-header">
                      <h4>{clase.materia_nombre || 'Clase'}</h4>
                      <span className={`class-status ${clase.estado}`}>{clase.estado}</span>
                    </div>
                    <div className="class-details">
                      <p><strong>Fecha:</strong> {new Date(clase.fecha_clase).toLocaleDateString()}</p>
                      <p><strong>Hora:</strong> {new Date(clase.fecha_clase).toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ textAlign: 'center', color: '#6b7280' }}>No hay clases programadas</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}