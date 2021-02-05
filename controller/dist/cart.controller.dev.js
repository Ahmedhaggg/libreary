"use strict";

var cartModel = require('../models/cart.model');

var reqIp = require('request-ip');

exports.getCart = function (req, res, next) {
  res.render('cart', {
    userData: req.userData ? req.userData : false,
    userId: req.session.userId,
    isUser: req.session.isUser,
    isAdmin: req.session.isAdmin
  });
};

exports.getCartItems = function (req, res, next) {
  console.log(req.connection.remoteAddress);

  if (req.body.booksId) {
    cartModel.getCartItems(req.body.booksId).then(function (books) {
      res.status(200).json({
        books: books
      });
    })["catch"](function (err) {
      res.status(404).json({
        err: err
      });
    });
  }
};

exports.checkBooks = function (req, res, next) {
  var list = req.body.list;
  var books = JSON.parse(list);
  console.log(list);
  cartModel.verifyBooks(books).then(function (result) {
    if (result && result.length > 0) {}
  })["catch"](function (err) {
    console.log(err);
  });
};