// src/components/Categories.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importar Link
import { getCategories, getRecipesByCategory } from '../services/recipeService';
import '../styles.css'; 

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const fetchRecipes = async () => {
                try {
                    const data = await getRecipesByCategory(selectedCategory);
                    setRecipes(data);
                } catch (error) {
                    console.error('Error al obtener las recetas:', error);
                }
            };

            fetchRecipes();
        }
    }, [selectedCategory]);

    return (
        <div className="categories">
            <h2>Recetas por Categoría</h2>
            <div className="category-list">
                {categories.map(category => (
                    <button
                        key={category.strCategory}
                        onClick={() => setSelectedCategory(category.strCategory)}
                    >
                        {category.strCategory}
                    </button>
                ))}
            </div>
            <div className="recipes">
                {recipes.length ? (
                    recipes.map(recipe => (
                        <div className="recipe" key={recipe.idMeal}>
                            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                            <h3>{recipe.strMeal}</h3>
                            <Link to={`/recipe/${recipe.idMeal}`} className="view-more-button">Ver Más</Link>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron recetas para esta categoría.</p>
                )}
            </div>
        </div>
    );
};

export default Categories;
