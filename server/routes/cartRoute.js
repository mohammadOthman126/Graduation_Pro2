const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../controllers/cartMiddleWare');

router.post('/add', authMiddleware, cartController.addToCart);
router.get('/getCart', authMiddleware, cartController.getCart);
router.delete('/removeFromCart/:destinationId', authMiddleware, cartController.removeFromCart);

module.exports = router;
