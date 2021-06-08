const express = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipe = require("./recipe");
const home = require("./home");
const types = require("./types");

const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json());

router.use('/recipe', recipe);
router.use('/home', home);
router.use('/types', types);

module.exports = router;
