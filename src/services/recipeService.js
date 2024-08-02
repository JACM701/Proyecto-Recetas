import axios from 'axios';

const API_URL = 'https://www.themealdb.com/api/json/v1/1/';
const LOCAL_STORAGE_KEY = 'recipeData';

// Obtiene todas las categorías
export const getCategories = async () => {
    const response = await fetch(`${API_URL}categories.php`);
    const data = await response.json();
    return data.categories;
};

// Obtiene recetas por categoría
export const getRecipesByCategory = async (category) => {
    const response = await fetch(`${API_URL}filter.php?c=${category}`);
    const data = await response.json();
    return data.meals;
};

// Obtiene recetas por término de búsqueda
export const getRecipes = async (searchTerm = '') => {
    const response = await fetch(`${API_URL}search.php?s=${searchTerm}`);
    const data = await response.json();
    return data.meals;
};

// Obtiene los detalles de una receta por su ID
export const getRecipebyID = async (id) => {
    const response = await axios.get(`/api/recipes/${id}`);
    return response.data;
};

export const getRecipeDetails = async (id) => {
    const response = await axios.get(`${API_URL}lookup.php?i=${id}`);
    return response.data.meals[0]; // Devuelve el primer elemento del array de resultados
};


// Obtiene los comentarios para una receta
export const getCommentsForRecipe = async (recipeId) => {
    const response = await axios.get(`/api/recipes/${recipeId}/comments`);
    return response.data;
};

// Añade un comentario a una receta
export const addCommentToRecipe = async (recipeId, comment) => {
    const response = await axios.post(`/api/recipes/${recipeId}/comments`, { comment });
    return response.data;
};

// Obtiene las recetas añadidas desde un archivo JSON simulado
export const getAddedRecipes = async () => {
    const response = await fetch('/addedRecipes.json');
    const data = await response.json();
    return data;
};

// Obtiene los datos de recetas del localStorage
export const getLocalRecipeData = () => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
};

// Guarda los datos de recetas en el localStorage
export const saveLocalRecipeData = (data) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

// Añade un comentario a una receta en el localStorage
export const addCommentToLocalRecipe = (idMeal, comment) => {
    const recipeData = getLocalRecipeData();
    if (!recipeData[idMeal]) {
        recipeData[idMeal] = { comments: [] };
    }
    recipeData[idMeal].comments.push(comment);
    saveLocalRecipeData(recipeData);
};

// Añade una calificación a una receta en el localStorage
export const rateRecipe = (idMeal, rating) => {
    const recipeData = getLocalRecipeData();
    if (!recipeData[idMeal]) {
        recipeData[idMeal] = { rating: 0, comments: [] };
    }
    recipeData[idMeal].rating = rating;
    saveLocalRecipeData(recipeData);
};
