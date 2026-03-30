const express = require('express');
const router = express.Router();
const financeiroController = require('../controllers/financeiroController');

router.post('/simular', financeiroController.simularImposto);

module.exports = router;