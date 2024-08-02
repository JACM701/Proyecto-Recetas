// src/components/AddedRecipes.js

import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Importa la configuración de Axios
import '../styles.css'; // Asegúrate de importar el archivo CSS adecuado

const AddedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(''); // Estado para manejar errores
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga

  const userId = localStorage.getItem('userId'); // Obtener el userId de localStorage

  useEffect(() => {
    const fetchAddedRecipes = async () => {
      if (!userId) {
        setError('No se ha encontrado el identificador de usuario.');
        setLoading(false);
        return;
      }

      try {
        console.log('User ID:', userId); // Verificar el valor del userId
        const response = await api.get('/recipesobtener', {
          params: { user_id: userId }
        });

        // Verificar si la respuesta es un JSON válido
        const data = response.data;
        if (Array.isArray(data)) {
          setRecipes(data);
        } else {
          throw new Error('La respuesta del servidor no es un JSON válido.');
        }
      } catch (error) {
        console.error('Error al obtener las recetas añadidas:', error);
        setError('Error al obtener las recetas. Por favor, inténtalo de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchAddedRecipes();
  }, [userId]);

  if (loading) {
    return <p>Cargando recetas...</p>; // Mensaje mientras se cargan las recetas
  }

  return (
    <div className="recipes">
      <h2>Recetas Añadidas</h2>
      {error && <p className="error-message">{error}</p>} {/* Mostrar mensaje de error si existe */}
      {recipes.length ? (
        recipes.map(recipe => (
          <div className="recipe" key={recipe.id}>
            {recipe.image && (
              <img src={recipe.image} alt={recipe.name} />
            )}
            <h3>{recipe.name}</h3>
            <button className="view-more-button" onClick={() => alert('Ver más detalles')}>Ver Más</button>
          </div>
        ))
      ) : (
        <p>No se han añadido recetas.</p>
      )}
    </div>
  );
};

export default AddedRecipes;
