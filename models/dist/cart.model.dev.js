"use strict";

var mongoose = require('mongoose');

var Product = require('./schema/product.schema');

exports.getCartItems = function (booksId) {
  return new Promise(function (resolve, reject) {
    Product.find({
      _id: booksId
    }).select('title amount price fileName discount').then(function (books) {
      resolve(books);
    })["catch"](function (err) {
      reject(err);
    });
  });
};

exports.verifyBooks = function (books) {
  var booksId = books.map(function (book) {
    return book.id;
  });
  return new Promise(function (resolve, reject) {
    Product.find().where('_id')["in"](booksId).then(function (books) {
      resolve(books);
    })["catch"](function (err) {
      resolve(err);
    });
  });
};