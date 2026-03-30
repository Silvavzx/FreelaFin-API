const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/detalhes', clienteController.detalhesCliente);

module.exports = router;