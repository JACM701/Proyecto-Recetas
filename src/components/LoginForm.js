import React, { useState } from 'react';
import api from '../services/api';  // Importar el servicio de API

function LoginForm({ onLogin, switchToRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');  // Estado para manejar errores

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Realizar solicitud POST para autenticar al usuario
            const response = await api.post('/auth/login', { email, password });
            onLogin(response.data);  // Llamar a la función onLogin con los datos de respuesta
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Error al iniciar sesión. Verifica tus credenciales e intenta de nuevo.');  // Mostrar mensaje de error
        }
    };

    return (
        <div className="login-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Iniciar sesión</h2>
                <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}  {/* Mostrar mensaje de error si existe */}
                <button type="submit" className="login-button">Iniciar sesión</button>
                <p>¿No tienes una cuenta? <a href="#" onClick={switchToRegister}>Regístrate aquí</a></p>
            </form>
        </div>
    );
}

export default LoginForm;
