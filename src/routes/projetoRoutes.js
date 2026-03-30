const express = require('express');
const router = express.Router();
const projetoController = require('../controllers/projetoController');

// Rota para listar projetos
router.get('/', projetoController.getProjetos);

module.exports = router;