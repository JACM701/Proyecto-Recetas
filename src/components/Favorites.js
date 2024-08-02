import React from 'react';
import { Link } from 'react-router-dom';

const Favorites = ({ favorites, removeFromFavorites }) => {
    return (
        <div className="favorites">
            <h2>Recetas Favoritas</h2>
            {favorites.length === 0 ? (
                <p>No tienes recetas favoritas.</p>
            ) : (
                <div className="recipe-list">
                    {favorites.map(recipe => (
                        <div key={recipe.idMeal} className="recipe">
                            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                            <h3>{recipe.strMeal}</h3>
                            <Link to={`/recipe/${recipe.idMeal}`} className="view-more-button">Ver Más</Link>
                            <button 
                                onClick={() => removeFromFavorites(recipe.idMeal)} 
                                className="delete-favorite-button"
                            >
                                <span className="icon">🗑️</span> Eliminar de Favoritos
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
