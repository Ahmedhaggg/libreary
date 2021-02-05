const router = require('express').Router();
const cartController = require('../controller/cart.controller');
router.get('/', cartController.getCart)
router.post('/content', cartController.getCartItems)
router.post('/books/check', cartController.checkBooks )
module.exports = router;