import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/auth-provider.tsx";
import { authAPI } from "../services/api.js";

export default function Singup() {

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [rol, setRol] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const auth = useAuth();
    if(auth.isAuthenticated){
        return <Navigate to="/dashboard" />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const userData = { nombre, apellido, telefono, password: contraseña, rol, email };
            const response = await authAPI.registro(userData);
            console.log('Registro exitoso:', response);

            setSuccess('Usuario registrado exitosamente. Puedes iniciar sesión.');

            // Limpiar formulario
            setNombre('');
            setApellido('');
            setEmail('');
            setTelefono('');
            setContraseña('');
            setRol('');
        } catch (err: any) {
            console.error('Error en registro:', err);
            setError(err.message || 'Error al registrar usuario. Intenta nuevamente.');
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
        <h1>Crear Cuenta</h1>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        {success && <div className="login-link"><a href="/">Ir al Login</a></div>}
        
        <div className="form-group">
          <label>Nombre:</label>
          <input 
              type="text" 
              value={nombre} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNombre(e.target.value)} 
              required 
          />
        </div>
        
        <div className="form-group">
          <label>Apellido:</label>
          <input 
              type="text" 
              value={apellido} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setApellido(e.target.value)} 
              required 
          />
        </div>
        
        <div className="form-group">
          <label>Email:</label>
          <input 
              type="email" 
              value={email} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
              required 
          />
        </div>
        
        <div className="form-group">
          <label>Teléfono:</label>
          <input 
              type="tel" 
              value={telefono} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTelefono(e.target.value)} 
              required 
          />
        </div>
        
        <div className="form-group">
          <label>Rol:</label>
          <select 
              value={rol} 
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRol(e.target.value)} 
              required
          >
              <option value="">Selecciona tu rol</option>
              <option value="estudiante">Estudiante</option>
              <option value="profesor">Profesor</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Contraseña:</label>
          <input 
              type="password" 
              value={contraseña} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContraseña(e.target.value)} 
              required 
          />
        </div>

        <button type="submit" disabled={loading}>
            {loading ? 'Creando...' : 'Crear Usuario'}
        </button> 
      </form>
    </div>
  );
}