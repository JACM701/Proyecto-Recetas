// src/components/SearchResults.js
import React from 'react';

const SearchResults = ({ recipes, addToFavorites }) => {
    return (
        <div className="search-results">
            <h2>Resultados de la búsqueda</h2>
            <div className="recipe-list">
                {recipes.map(recipe => (
                    <div key={recipe.id} className="recipe">
                        <img src={recipe.imageUrl} alt={recipe.name} />
                        <h3>{recipe.name}</h3>
                        <p>{recipe.description}</p>
                        <button onClick={() => addToFavorites(recipe)}>Añadir a Favoritos</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
