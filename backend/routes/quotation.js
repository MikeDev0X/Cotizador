const express = require('express');
const router = express.Router();
const quotationController = require('../controller/quotationController');
//const middleware = require('../middleware/jwt-middleware');

router.post('/addQuotation', quotationController.addQuotation);
router.get('/getLastQuotation', quotationController.getLastQuotation);

module.exports = router;