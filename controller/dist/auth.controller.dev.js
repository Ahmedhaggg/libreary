"use strict";

var validationResult = require('express-validator').validationResult;

var authModel = require('../models/auth.model'); // get page to sign up


exports.getSign = function (req, res, next) {
  res.render("signup", {
    emailUsed: req.flash("emailUsed"),
    authError: req.flash("authError"),
    values: req.flash("values")[0],
    isUser: false,
    isAdmin: false,
    userId: false
  });
}; // create a user


exports.createUser = function _callee(req, res, next) {
  var _req$body, _firstName, _lastName, _city, _email, values, _req$body2, _firstName2, _lastName2, _city2, _email2, _values, _req$body3, data;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(validationResult(req).array().length > 0)) {
            _context.next = 10;
            break;
          }

          // check error is completly or no
          _req$body = req.body, _firstName = _req$body.firstName, _lastName = _req$body.lastName, _city = _req$body.city, _email = _req$body.email;
          values = {
            firstName: _firstName,
            lastName: _lastName,
            city: _city,
            email: _email
          };
          _context.next = 5;
          return regeneratorRuntime.awrap(req.flash("authError", validationResult(req).array()));

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(req.flash("values", values));

        case 7:
          res.redirect('/sign');
          _context.next = 22;
          break;

        case 10:
          if (!(req.body.password !== req.body.confirm)) {
            _context.next = 20;
            break;
          }

          // check password is confirmed or no
          _req$body2 = req.body, _firstName2 = _req$body2.firstName, _lastName2 = _req$body2.lastName, _city2 = _req$body2.city, _email2 = _req$body2.email;
          _values = {
            firstName: _firstName2,
            lastName: _lastName2,
            city: _city2,
            email: _email2
          };
          _context.next = 15;
          return regeneratorRuntime.awrap(req.flash("authError", {
            param: "confirm",
            msg: "you should confirm password"
          }));

        case 15:
          _context.next = 17;
          return regeneratorRuntime.awrap(req.flash("values", _values));

        case 17:
          res.redirect('/sign');
          _context.next = 22;
          break;

        case 20:
          data = (_req$body3 = req.body, firstName = _req$body3.firstName, lastName = _req$body3.lastName, city = _req$body3.city, country = _req$body3.country, email = _req$body3.email, password = _req$body3.password, gender = _req$body3.gender, _req$body3);
          authModel.createUser(data).then(function () {
            res.redirect('/');
          })["catch"](function (err) {
            req.flash("emailUsed", err);
            res.redirect('/sign');
          });

        case 22:
        case "end":
          return _context.stop();
      }
    }
  });
}; // get page for login


exports.getLogin = function (req, res, next) {
  res.render('login', {
    authError: req.flash("authError"),
    enrollError: req.flash("emailErr"),
    values: req.flash("values")[0],
    isUser: false,
    isAdmin: false,
    userId: false
  });
}; // get a page for enroll in


exports.enroll = function _callee2(req, res, next) {
  var _email3, _req$body4, _email4, _password;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(validationResult(req).array().length > 0)) {
            _context2.next = 10;
            break;
          }

          _email3 = req.body.email;
          console.log(validationResult(req).array());
          _context2.next = 5;
          return regeneratorRuntime.awrap(req.flash("values", {
            email: _email3
          }));

        case 5:
          _context2.next = 7;
          return regeneratorRuntime.awrap(req.flash("authError", validationResult(req).array()));

        case 7:
          res.redirect('/login');
          _context2.next = 12;
          break;

        case 10:
          _req$body4 = req.body, _email4 = _req$body4.email, _password = _req$body4.password;
          authModel.enroll(_email4, _password).then(function (user) {
            req.session.userId = user.id, req.session.isUser = user.isUser, req.session.isAdmin = user.isAdmin;
            res.redirect('/');
          })["catch"](function (err) {
            req.flash("values", {
              email: _email4
            });
            req.flash("emailErr", err);
            res.redirect('/login');
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.logout = function (req, res, next) {
  req.session.destroy();
  res.redirect('/');
};