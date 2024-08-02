const express = require('express');
const multer = require('multer');
const db = require('../db');
const router = express.Router();

// Configuración de multer para manejo de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Ruta para añadir una receta (manejo de imagen como archivo o URL)
router.post('/', upload.single('image'), async (req, res) => {
  const { name, category, ingredients, instructions } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image; // Usa la URL si se proporciona
  const userId = req.body.user_id || req.user.id; // Obtén el user_id de req.body o de req.user.id

  if (!userId) {
    return res.status(400).json({ error: 'user_id es requerido' });
  }

  try {
    const query = 'INSERT INTO recipes (name, category, ingredients, instructions, image, user_id) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await db.query(query, [name, category, ingredients, instructions, image, userId]);
    res.status(201).json({ id: result.insertId, name, category, ingredients, instructions, image, userId });
  } catch (err) {
    console.error('Error adding recipe:', err);
    res.status(500).json({ error: err.message });
  }
});

// Ruta para obtener recetas del usuario
router.get('/recipesobtener', async (req, res) => {
  const userId = req.query.user_id || req.user.id; // Obtén el user_id de los parámetros de la consulta o de req.user.id
  
  if (!userId) {
    return res.status(400).json({ error: 'user_id es requerido' });
  }

  try {
    const query = 'SELECT * FROM recipes WHERE user_id = ?';
    const [rows] = await db.query(query, [userId]);
    res.status(200).json(rows); // Asegúrate de que `rows` sea un array JSON válido
  } catch (err) {
    console.error('Error fetching recipes:', err);
    res.status(500).json({ error: err.message });
  }
});

// Ruta para obtener detalles de una receta
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [recipe] = await db.query('SELECT * FROM recipes WHERE id = ?', [id]);
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta para obtener comentarios para una receta
router.get('/:id/comments', async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await db.query(`
      SELECT c.id, c.comment, c.created_at, u.username
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.recipe_id = ?`, [id]);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta para añadir comentario a una receta
router.post('/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const userId = req.user.id; // Supón que tienes middleware para gestionar la sesión de usuario

  if (!userId) {
    return res.status(400).json({ error: 'Usuario no autenticado' });
  }

  try {
    const result = await db.query('INSERT INTO comments (recipe_id, user_id, comment) VALUES (?, ?, ?)', [id, userId, comment]);
    res.status(201).json({ id: result.insertId, comment, created_at: new Date() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
