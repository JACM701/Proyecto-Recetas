import React, { useEffect, useState } from 'react';
import { getRecipes } from '../services/recipeService';
import Recipe from './RecipeList.js';
import './styles.css'; // Asegúrate de que esta ruta sea correcta

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Función para obtener las recetas
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <main>
      <header>
        <div className="header-content">
          <h1>Bienvenido a la Página de Recetas</h1>
          <p>Explora nuestras deliciosas recetas.</p>
          <a href="/favorites" className="explore-button">Ver Favoritos</a>
        </div>
      </header>
      <section className="recipes">
        {recipes.length ? (
          recipes.map(recipe => (
            <Recipe key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p>No se encontraron recetas.</p>
        )}
      </section>
    </main>
  );
};

export default HomePage;
