"use strict";

var mongoose = require('mongoose');

var User = require('./schema/user.schema');

var bcrypt = require('bcrypt');

exports.createUser = function (data) {
  return new Promise(function (resolve, reject) {
    User.findOne({
      email: data.email
    }).then(function (user) {
      if (user) reject("This Email is used before");else return bcrypt.hash(data.password, 12);
    }).then(function (hashPassword) {
      data.password = hashPassword;
      var user = new User(data);
      return user.save();
    }).then(function () {
      resolve("user created");
    })["catch"](function (err) {
      reject(err);
    });
  });
};

exports.enroll = function (email, password) {
  return new Promise(function (resolve, reject) {
    var userData;
    User.findOne({
      email: email
    }).then(function (user) {
      userData = user;
      if (!user) reject("This email isn't used");else return bcrypt.compare(password, user.password);
    }).then(function (result) {
      if (!result) reject("password is wrong");else resolve(userData);
    })["catch"](function (err) {
      reject(err);
    });
  });
};

exports.getUserData = function (userId) {
  return User.findById(userId).select("image _id firstName lastName");
};