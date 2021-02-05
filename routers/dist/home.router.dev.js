"use strict";

var router = require('express').Router();

var homeController = require('../controller/home.controller');

router.get('/', homeController.getHome);
router.get('/book/:bookName', homeController.getBook);
module.exports = router;