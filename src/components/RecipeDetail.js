// src/components/RecipeDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getRecipeDetails,
  addCommentToRecipe,
  rateRecipe,
  getLocalRecipeData
} from '../services/recipeService';
import '../styles.css';

const RecipeDetail = ({ addToFavorites }) => {
  const { id } = useParams(); // Obtiene el ID de la receta desde la URL
  const [recipe, setRecipe] = useState(null); // Estado para almacenar la receta
  const [rating, setRating] = useState(0); // Estado para almacenar la calificación
  const [comment, setComment] = useState(''); // Estado para almacenar el comentario
  const [comments, setComments] = useState([]); // Estado para almacenar los comentarios

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const data = await getRecipeDetails(id);
        setRecipe(data);

        // Obtener datos locales si existen
        const localData = getLocalRecipeData();
        if (localData[data.idMeal]) {
          setComments(localData[data.idMeal].comments || []);
          setRating(localData[data.idMeal].rating || 0);
        }
      } catch (error) {
        console.error('Error al obtener detalles de la receta:', error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const handleRatingChange = (e) => setRating(Number(e.target.value));
  const handleCommentChange = (e) => setComment(e.target.value);

  const submitComment = () => {
    if (comment.trim() === '') return; // No enviar comentario vacío
    addCommentToRecipe(recipe.idMeal, comment);
    setComments([...comments, comment]);
    setComment('');
  };

  const submitRating = () => {
    if (rating < 1 || rating > 5) return; // Validar rating
    rateRecipe(recipe.idMeal, rating);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: recipe.strMeal,
          text: `Check out this recipe: ${recipe.strMeal}`,
          url: window.location.href // O la URL de la receta específica
        });
        console.log('Recipe shared successfully');
      } else {
        console.log('Share API not supported');
      }
    } catch (error) {
      console.error('Error sharing recipe:', error);
    }
  };

  if (!recipe) return <p>Cargando...</p>; // Muestra un mensaje mientras se carga la receta

  return (
    <div className="recipe-detail">
      {/* Botones de navegación */}
      <div className="navigation-buttons">
        <button className="favorites-button" onClick={() => addToFavorites(recipe)}>
          <span role="img" aria-label="star">⭐</span> Agregar a Favoritos
        </button>
        <button className="back-button">
          <Link to="/">Volver</Link>
        </button>
      </div>

      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <button className="share-button" onClick={handleShare}>
        Compartir
      </button>
      <h1>{recipe.strMeal}</h1>
      <h2>{recipe.strCategory}</h2>
      <h3>{recipe.strArea}</h3>
      <h4>Ingredientes:</h4>
      <ul>
        {Array.from({ length: 20 }, (_, index) => (
          recipe[`strIngredient${index + 1}`] && (
            <li key={index}>
              {recipe[`strIngredient${index + 1}`]} - {recipe[`strMeasure${index + 1}`]}
            </li>
          )
        ))}
      </ul>
      <h4>Instrucciones:</h4>
      <p>{recipe.strInstructions}</p>

      <div className="rating-section">
        <h4>Calificación</h4>
        <input 
          type="number" 
          min="1" 
          max="5" 
          value={rating} 
          onChange={handleRatingChange} 
          placeholder="Califica del 1 al 5"
        />
        <button onClick={submitRating}>Calificar</button>
      </div>

      <div className="comments-section">
        <h4>Comentarios</h4>
        <textarea 
          value={comment} 
          onChange={handleCommentChange} 
          placeholder="Añade un comentario"
        />
        <button onClick={submitComment}>Enviar Comentario</button>
        <div className="comments-list">
          {comments.map((c, index) => (
            <p key={index}>{c}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
