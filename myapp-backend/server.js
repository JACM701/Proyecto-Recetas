const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
const mysql = require('mysql2');

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Para servir archivos estáticos
app.use(express.json());

// Rutas
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipe');
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
