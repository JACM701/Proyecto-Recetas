import React, { useState } from 'react';
import api from '../services/api'; // Importa la configuración de Axios
import '../styles.css'; // Asegúrate de importar el archivo CSS adecuado

const App = () => {
  // Supongamos que tienes un mecanismo para obtener el ID del usuario
  const userId = '12345'; // O cualquier lógica para obtener el ID del usuario
  return (
      <div className="app">
        <AddRecipeForm userId={userId} />
      </div>
    );
  };
  
const AddRecipeForm = ({ userId }) => {
  const [recipe, setRecipe] = useState({
    name: '',
    category: '',
    ingredients: '',
    instructions: '',
    image: '', // Cambiado de null a cadena de texto
  });

  const [message, setMessage] = useState(''); // Estado para manejar mensajes
  const [messageType, setMessageType] = useState(''); // Estado para manejar tipo de mensaje (success/error)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/recipes', {
        ...recipe,
        user_id: userId // Añadir el userId a los datos del formulario
      });
      console.log('Receta añadida:', response.data);
      setMessage('Receta añadida con éxito!');
      setMessageType('success'); // Tipo de mensaje: éxito
      setRecipe({ name: '', category: '', ingredients: '', instructions: '', image: '' }); // Limpiar formulario
    } catch (error) {
      console.error('Error al añadir la receta:', error);
      setMessage('Error al añadir la receta. Por favor, inténtalo de nuevo.');
      setMessageType('error'); // Tipo de mensaje: error
    }
  };

  return (
    <div className="add-recipe-form">
      <h2>Añadir Receta</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre de la Receta</label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <input
            type="text"
            id="category"
            name="category"
            value={recipe.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredientes</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="instructions">Instrucciones</label>
          <textarea
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">URL de la Imagen de la Receta</label>
          <input
            type="text"
            id="image"
            name="image"
            value={recipe.image}
            onChange={handleChange}
            placeholder="Ingrese la URL de la imagen"
          />
        </div>
        <button type="submit">Añadir Receta</button>
      </form>

      {/* Mostrar mensajes de éxito o error */}
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

      <div className="recipe-preview">
        <h3>Vista previa de la receta</h3>
        <p><strong>Nombre:</strong> {recipe.name}</p>
        <p><strong>Categoría:</strong> {recipe.category}</p>
        <p><strong>Ingredientes:</strong> {recipe.ingredients}</p>
        <p><strong>Instrucciones:</strong> {recipe.instructions}</p>
        {recipe.image && (
          <div>
            <strong>Imagen:</strong>
            <img src={recipe.image} alt="Vista previa de la receta" width="200" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddRecipeForm;
