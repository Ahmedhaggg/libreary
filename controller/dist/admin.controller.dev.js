"use strict";

var multer = require('multer');

var fs = require('fs');

var validationResult = require('express-validator').validationResult;

var adminModel = require('../models/admin.model');

exports.getControlPanel = function (req, res, next) {
  res.render('panel', {
    addBookErr: req.flash("addBookErr")[0],
    addBookCompeletly: req.flash("addBookCompeletly")[0]
  });
};

exports.addBook = function (req, res, next) {
  if (validationResult(req).array().length > 0) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    req.flash("addBookErr", "can't added product you should complete a fields");
    res.redirect('/panel');
  } else {
    req.body.discount ? req.body.discount : 0;
    var _req$body = req.body,
        title = _req$body.title,
        author = _req$body.author,
        year = _req$body.year,
        category = _req$body.category,
        price = _req$body.price,
        amount = _req$body.amount,
        discount = _req$body.discount,
        description = _req$body.description;
    var fileName = req.file.filename;
    var today = new Date();
    var timeStamp = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    adminModel.addBook({
      title: title,
      author: author,
      year: year,
      category: category,
      price: price,
      amount: amount,
      discount: discount,
      description: description,
      fileName: fileName,
      timeStamp: timeStamp
    }).then(function () {
      req.flash("addBookCompeletly", "book is added");
      res.redirect('/panel');
    })["catch"](function (err) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }

      req.flash("addBookErr", err);
      res.redirect('/panel');
    });
  }
};