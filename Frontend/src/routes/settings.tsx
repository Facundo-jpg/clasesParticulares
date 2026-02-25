import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/auth-provider.tsx';
import { authAPI } from '../services/api.js';
import './dashboard.css';

export default function Settings() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const [formData, setFormData] = useState({
    nombre: user.nombre || '',
    apellido: user.apellido || '',
    email: user.email || '',
    telefono: user.telefono || '',
    password: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Validar contraseñas si se está cambiando
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          setMessage({ type: 'error', text: 'Las contraseñas no coinciden' });
          setLoading(false);
          return;
        }
        if (formData.newPassword.length < 6) {
          setMessage({ type: 'error', text: 'La contraseña debe tener al menos 6 caracteres' });
          setLoading(false);
          return;
        }
      }

      const updateData: any = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        telefono: formData.telefono
      };

      if (formData.newPassword) {
        updateData.password = formData.newPassword;
      }

      const updatedUser = await authAPI.actualizarUsuario(user.id, updateData);
      
      // Actualizar localStorage y estado
      const newUserData = { ...user, ...updatedUser };
      localStorage.setItem('user', JSON.stringify(newUserData));
      setUser(newUserData);
      
      setMessage({ type: 'success', text: 'Perfil actualizado correctamente' });
      
      // Limpiar campos de contraseña
      setFormData({
        ...formData,
        password: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Error al actualizar el perfil' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    auth.logOut();
  };

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

      <div className="dashboard-nav">
        <button className="nav-btn" onClick={() => navigate(-1)}>
          ← Volver
        </button>
        <button className="nav-btn active">
          Ajustes
        </button>
      </div>

      <div className="dashboard-main">
        <div className="section-header">
          <h2>Configuración de Perfil</h2>
        </div>

        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="class-card" style={{ padding: '2rem' }}>
            {message.text && (
              <div style={{
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2',
                color: message.type === 'success' ? '#065f46' : '#991b1b',
                border: `1px solid ${message.type === 'success' ? '#a7f3d0' : '#fecaca'}`
              }}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem', color: '#1a1a1a' }}>Información Personal</h3>
                
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151', fontSize: '0.875rem' }}>
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '0.9375rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151', fontSize: '0.875rem' }}>
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '0.9375rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151', fontSize: '0.875rem' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '0.9375rem',
                      backgroundColor: '#f3f4f6',
                      color: '#6b7280',
                      boxSizing: 'border-box'
                    }}
                  />
                  <small style={{ color: '#6b7280', fontSize: '0.75rem' }}>El email no se puede modificar</small>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151', fontSize: '0.875rem' }}>
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '0.9375rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
                <h3 style={{ marginBottom: '1rem', color: '#1a1a1a' }}>Cambiar Contraseña</h3>
                
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151', fontSize: '0.875rem' }}>
                    Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Dejar en blanco para no cambiar"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '0.9375rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151', fontSize: '0.875rem' }}>
                    Confirmar Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirmar nueva contraseña"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '0.9375rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ flex: 1 }}
                >
                  {loading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="btn-secondary"
                  style={{ flex: 1 }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
