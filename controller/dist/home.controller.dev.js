"use strict";

var homeModel = require('../models/home.mode');

exports.getHome = function _callee(req, res, next) {
  var books;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(homeModel.getHomeBooks());

        case 2:
          books = _context.sent;
          res.render('index', {
            userData: req.userData ? req.userData : false,
            userId: req.session.userId,
            isUser: req.session.isUser,
            isAdmin: req.session.isAdmin,
            books: books
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getBook = function (req, res, next) {
  var title = req.params.bookName.toString().split('-').join(' ');
  if (title === "c") title = title + "#";else false;
  homeModel.getBook(title).then(function (book) {
    console.log(book);
    res.render('book', {
      userData: req.userData ? req.userData : false,
      userId: req.session.userId,
      isUser: req.session.isUser,
      isAdmin: req.session.isAdmin,
      book: book
    });
  })["catch"](function () {
    res.render('error', {
      userId: req.session.userId,
      isUser: req.session.isUser,
      isAdmin: req.session.isAdmin
    });
  });
};