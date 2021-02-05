"use strict";

var express = require('express');

var path = require('path');

var mongoose = require('mongoose');

var session = require('express-session');

var SessionStore = require('connect-mongodb-session')(session);

var flash = require('connect-flash');

var app = express();
app.use(flash());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
mongoose.connect("mongodb://localhost:27017/appone", options, function (err) {
  return err ? console.log(err) : console.log("mongodb connecting");
});
var store = new SessionStore({
  uri: "mongodb://localhost:27017/appone",
  collection: "sessions"
});
app.use(session({
  secret: "this is blab lab laapgdg bdjgd hsiyie dhidio",
  saveUninitialized: false,
  resave: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 100
  },
  store: store
}));
app.use(express["static"](path.join(__dirname, "assets")));
app.use(express["static"](path.join(__dirname, "upload")));
app.set("view engine", "ejs");
app.set("views", "views"); // special middel ware

var authModel = require('./models/auth.model');

app.use(function _callee(req, res, next) {
  var userData;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!req.session.userId) {
            _context.next = 7;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(authModel.getUserData(req.session.userId));

        case 3:
          userData = _context.sent;

          if (userData) {
            req.userData = userData;
            next();
          } else {
            res.redirect('/login');
          }

          _context.next = 8;
          break;

        case 7:
          next();

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}); // end special middelware
// application routers

var homeRouter = require('./routers/home.router');

var authRouter = require('./routers/auth.router');

var adminRouter = require('./routers/admin.router');

var cartRouter = require('./routers/cart.router'); // using routers 


app.use('/', homeRouter);
app.use('/', authRouter);
app.use('/', adminRouter);
app.use('/cart', cartRouter);
app.get('/err', function (req, res, next) {
  res.render('error', {
    userData: req.userData ? req.userData : false,
    userId: req.session.userId,
    isUser: req.session.isUser,
    isAdmin: req.session.isAdmin
  });
});
app.use(function (err, req, res, next) {
  res.redirect('/err');
});
var port = process.env.PORT || 9999;
app.listen(port, function () {
  return console.log("surver running");
});