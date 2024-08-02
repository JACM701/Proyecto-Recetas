import React, { useState } from 'react';
import api from '../services/api';  // Importar el servicio de API

function RegisterForm({ onRegister, switchToLogin }) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');  // Estado para manejar errores

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Realizar solicitud POST para registrar al usuario
            const response = await api.post('/auth/register', { email, username, password });
            onRegister(response.data);  // Llamar a la función onRegister con los datos de respuesta
        } catch (error) {
            console.error('Error registering:', error);
            setError('Error al registrarse. Por favor, verifica tus datos e intenta de nuevo.');  // Mostrar mensaje de error
        }
    };

    return (
        <div className="register-form-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Registrarse</h2>
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
                    <label htmlFor="username">Nombre de usuario</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                <button type="submit" className="register-button">Registrarse</button>
                <p>¿Ya tienes una cuenta? <a href="#" onClick={switchToLogin}>Inicia sesión aquí</a></p>
            </form>
        </div>
    );
}

export default RegisterForm;
