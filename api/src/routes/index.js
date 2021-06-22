const express = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipes = require("./recipes");
const home = require("./home");
const types = require("./types");
const addRecipe = require("./recipe");

const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json());

router.use('/recipe', addRecipe);
router.use('/recipes', recipes);
router.use('/home', home);
router.use('/types', types);

module.exports = router;
