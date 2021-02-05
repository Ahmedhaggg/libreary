"use strict";

var Book = require('./schema/product.schema');

exports.addBook = function (data) {
  return new Promise(function (resolve, reject) {
    return Book.findOne({
      title: data.title
    }).then(function (result) {
      if (result) {
        reject('there is a Book with this title');
      } else {
        var book = new Book(data);
        return book.save();
      }
    }).then(function () {
      resolve();
    })["catch"](function (err) {
      reject(err);
    });
  });
};