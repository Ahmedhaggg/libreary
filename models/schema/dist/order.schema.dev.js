"use strict";

var mongoose = require('mongoose');

var OrderSchema = mongoose.Schema({
  books: {
    type: mongoose.Schema.Types.ObjectId,
    req: true,
    ref: 'book'
  },
  totalPrice: {
    type: Number,
    req: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId
  },
  orderPlace: {
    zip: {
      type: String
    },
    city: {
      type: String
    },
    country: {
      type: String
    }
  },
  isOrder: {
    type: Boolean,
    def: false
  },
  charge: {
    type: Boolean,
    def: false
  },
  timeStamp: String
});
var Order = mongoose.model("order", OrderSchema);
module.exports = Order;