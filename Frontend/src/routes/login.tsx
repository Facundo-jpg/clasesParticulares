import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/auth-provider.tsx";
import { authAPI } from "../services/api.js";

export default function Login() {
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const auth = useAuth();
    if(auth.isAuthenticated){
        return <Navigate to="/dashboard" />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await authAPI.login({ email, password: contraseña });
            console.log('Login exitoso:', response);
            const user = response.user || {};
            const userData = {
                id: user.id,
                nombre: user.nombre || 'Usuario',
                apellido: user.apellido || '',
                email: user.email || email,
                rol: user.rol || 'estudiante'
            };
            localStorage.setItem('user', JSON.stringify(userData));
            auth.loginAction(userData);
        } catch (err) {
            setError('Error al iniciar sesión. Verifica tus credenciales.');
        } finally {
            setLoading(false);
        }
    };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="brand-header">
          <h2>EduControl</h2>
        </div>
        <h1>Bienvenido</h1>
        <p className="form-subtitle">Inicia sesión en tu cuenta</p>
        {error && <div className="alert alert-error">{error}</div>}
        
        <div className="form-group">
          <label>Email:</label>
          <input 
              type="email" 
              value={email} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
              placeholder="tu@email.com"
              required 
          />
        </div>
        
        <div className="form-group">
          <label>Contraseña:</label>
          <input 
              type="password" 
              value={contraseña} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContraseña(e.target.value)} 
              placeholder="Tu contraseña"
              required 
          />
        </div>

        <button type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
        </button>
        
        <div className="form-footer">
          <p>¿No tienes cuenta? <a href="/singup">Regístrate aquí</a></p>
        </div>
      </form>
    </div>
  );
}