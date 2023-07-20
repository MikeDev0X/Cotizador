const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
//const middleware = require('../middleware/jwt-middleware');

router.post('/addProduct', productController.addProduct);
router.get('/getProducts', productController.getProducts);
router.get('/getTransducers/:idProduct', productController.getTransducers);

module.exports = router;