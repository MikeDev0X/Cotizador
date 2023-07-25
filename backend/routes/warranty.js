const express = require('express');
const router = express.Router();
const warrantyController = require('../controller/warrantyController');
//const middleware = require('../middleware/jwt-middleware');

router.get('/getWarranties/:idProduct', warrantyController.getWarranties);
router.get('/getIdWarranty/:idProduct/:name', warrantyController.getIdWarranty);
router.get('/getAllWarranties/', warrantyController.getAllWarranties);
router.post('/addMultipleWarranties/', warrantyController.addMultipleWarranties);


module.exports = router;