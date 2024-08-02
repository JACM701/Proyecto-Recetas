import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRecipes } from '../services/recipeService';
import '../styles.css'; // Asegúrate de crear este archivo CSS
import api from '../services/api';  // Importar el servicio de API

const RecipeList = ({ searchTerm }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes(searchTerm);
        setRecipes(data);
      } catch (error) {
        console.error('Error al obtener las recetas:', error);
      }
    };

    fetchRecipes();
  }, [searchTerm]);

  return (
    <div className="recipes">
      {recipes.length ? (
        recipes.map(recipe => (
          <div className="recipe" key={recipe.idMeal}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <div className="recipe-name">{recipe.strMeal}</div>
            <Link to={`/recipe/${recipe.idMeal}`} className="view-more-button">Ver más</Link>
            <button className="favorites-button">
              <span role="img" aria-label="star">⭐</span>
            </button>
          </div>
        ))
      ) : (
        <p>No se encontraron recetas.</p>
      )}
    </div>
  );
};

export default RecipeList;
