"use strict";

var router = require('express').Router();

var cartController = require('../controller/cart.controller');

router.get('/', cartController.getCart);
router.post('/content', cartController.getCartItems);
router.post('/books/check', cartController.checkBooks);
module.exports = router;