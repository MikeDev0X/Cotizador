const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
//const middleware = require('../middleware/jwt-middleware');

router.post('/addProduct', productController.addProduct);
router.get('/getProducts', productController.getProducts);
router.get('/getHasTransducer/:idProduct', productController.getHasTransducer);
router.get('/getAllTransducers', productController.getAllTransducers);
router.get('/getTransducersFrom/:idProduct', productController.getTransducersFrom);
router.post('/addMultipleTransducers/', productController.addMultipleTransducers);


module.exports = router;