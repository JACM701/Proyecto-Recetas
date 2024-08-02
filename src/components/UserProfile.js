import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Asegúrate de tener axios instalado
import '../styles.css'; // Asegúrate de que este archivo CSS esté actualizado

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    profileImage: '/path/to/default-image.jpg',
    recipes: [] // Obtendrás las recetas desde el backend
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newImage, setNewImage] = useState('');
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  useEffect(() => {
    // Obtener el token de localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    // Solicitar información del usuario
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/auth/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserInfo({
          ...response.data,
          profileImage: response.data.profileImage || '/path/to/default-image.jpg'
        });
        setEditedName(response.data.name);
        setEditedEmail(response.data.email);
      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e) => {
    setNewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSave = async () => {
    // Obtener el token de localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      // Actualizar la información del usuario en el backend
      await axios.put('http://localhost:3001/api/auth/user', {
        name: editedName,
        email: editedEmail,
        profileImage: newImage
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (newImage) {
        setUserInfo((prevInfo) => ({ ...prevInfo, profileImage: newImage }));
      }
      setUserInfo((prevInfo) => ({ ...prevInfo, name: editedName, email: editedEmail }));
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar la información del usuario:', error);
    }
  };

  const handleCancel = () => {
    setNewImage('');
    setEditedName(userInfo.name);
    setEditedEmail(userInfo.email);
    setIsEditing(false);
  };

  return (
    <div className="user-profile">
      <h1>Perfil de Usuario</h1>
      <div className="profile-info">
        <img src={userInfo.profileImage} alt="Profile" className="profile-image" />
        <div className="profile-details">
          {isEditing ? (
            <>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
              />
              <input 
                type="text" 
                value={editedName} 
                onChange={(e) => setEditedName(e.target.value)} 
                placeholder="Nombre" 
              />
              <input 
                type="email" 
                value={editedEmail} 
                onChange={(e) => setEditedEmail(e.target.value)} 
                placeholder="Correo Electrónico" 
              />
              <button onClick={handleSave}>Guardar</button>
              <button onClick={handleCancel}>Cancelar</button>
            </>
          ) : (
            <>
              <p><strong>Nombre:</strong> {userInfo.name}</p>
              <p><strong>Email:</strong> {userInfo.email}</p>
              <button onClick={() => setIsEditing(true)}>Editar Perfil</button>
            </>
          )}
        </div>
      </div>
      <div className="user-recipes">
        <h2>Recetas Añadidas</h2>
        {userInfo.recipes.length > 0 ? (
          <ul>
            {userInfo.recipes.map((recipe, index) => (
              <li key={index}>{recipe}</li>
            ))}
          </ul>
        ) : (
          <p>No has añadido ninguna receta todavía.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
