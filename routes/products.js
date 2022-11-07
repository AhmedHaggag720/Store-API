const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', productsController.getAllProducts);

router.get('/static', productsController.getAllProductsStatic);

module.exports = router;