"use strict";

var User = require('../models/schema/user.schema');

var Product = require('./schema/product.schema');

exports.getHomeBooks = function _callee() {
  var topRating, bestSellar, newProducts;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Product.find().sort({
            totalRating: -1
          }).limit(8).select('id title price fileName totalRating'));

        case 2:
          topRating = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(Product.find().sort({
            sales: -1
          }).limit(8).select('id title price fileName totalRating'));

        case 5:
          bestSellar = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(Product.find().sort({
            year: -1
          }).limit(8).select('id title price fileName totalRating'));

        case 8:
          newProducts = _context.sent;
          return _context.abrupt("return", {
            topRating: topRating,
            bestSellar: bestSellar,
            newProducts: newProducts
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getBook = function (title) {
  return new Promise(function (resolve, reject) {
    return Product.findOne({
      title: title
    }).then(function (book) {
      if (book) resolve(book);else reject();
    })["catch"](function () {
      reject();
    });
  });
};