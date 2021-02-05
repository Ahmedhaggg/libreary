"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Quantity =
/*#__PURE__*/
function () {
  function Quantity(quantity, avaliQuantity, addedQuantity) {
    _classCallCheck(this, Quantity);

    this.quantity = quantity;
    this.avaliQuantity = avaliQuantity;
    this.addedQuantity = addedQuantity;
  }

  _createClass(Quantity, [{
    key: "removeOpacity",
    value: function removeOpacity() {
      document.querySelector('.quantity-plus').style.opacity = '1';
      document.querySelector('.quantity-minus').style.opacity = '1';
    }
  }, {
    key: "handelBtns",
    value: function handelBtns() {
      if (this.quantity === 1) document.querySelector('.quantity-minus').style.opacity = '0';else if (this.quantity === this.avaliQuantity) document.querySelector('.quantity-plus').style.opacity = '0';else this.removeOpacity();
    }
  }, {
    key: "checkQuantity",
    value: function checkQuantity() {
      if (this.quantity !== this.avaliQuantity && this.addedQuantity === 1 || this.quantity !== 1 && this.addedQuantity === -1) {
        this.sumQuantity();
        this.handelBtns();
      }
    }
  }, {
    key: "sumQuantity",
    value: function sumQuantity() {
      this.quantity = this.quantity + this.addedQuantity;
      document.querySelector('.quantity').textContent = this.quantity;
    }
  }], [{
    key: "render",
    value: function render(addedQuantity) {
      var quantity = parseInt(document.querySelector('#productQuantity').textContent);
      var avaliQuantity = parseInt(document.querySelector('#availQuantity').value);
      var changeQuantity = new Quantity(quantity, avaliQuantity, addedQuantity);
      changeQuantity.checkQuantity();
    }
  }]);

  return Quantity;
}();

document.querySelector('.quantity-plus').addEventListener('click', function () {
  Quantity.render(+1);
});
document.querySelector('.quantity-minus').addEventListener('click', function () {
  Quantity.render(-1);
});

var LoadQuantity =
/*#__PURE__*/
function (_Quantity) {
  _inherits(LoadQuantity, _Quantity);

  function LoadQuantity(quantity, avaliQuantity) {
    _classCallCheck(this, LoadQuantity);

    return _possibleConstructorReturn(this, _getPrototypeOf(LoadQuantity).call(this, quantity, avaliQuantity));
  }

  _createClass(LoadQuantity, [{
    key: "sendQuantity",
    value: function sendQuantity() {
      document.querySelector('#productQuantity').textContent = this.quantity;
    }
  }], [{
    key: "render",
    value: function render() {
      var storaged = JSON.parse(localStorage.getItem('cartItems'));

      if (storaged) {
        var bookId = document.querySelector('#bookId').value;
        var bookStoraged = storaged.find(function (book) {
          return book.id === bookId;
        });

        if (bookStoraged) {
          var avaliQuantity = parseInt(document.querySelector('#availQuantity').value);
          var loadQuantity = new LoadQuantity(bookStoraged.quantity, avaliQuantity);
          loadQuantity.sendQuantity();
          loadQuantity.handelBtns();
        }
      }
    }
  }]);

  return LoadQuantity;
}(Quantity);

window.addEventListener('click', LoadQuantity.render());

var AddToCart =
/*#__PURE__*/
function () {
  function AddToCart(id, quantity, productsStoraged) {
    _classCallCheck(this, AddToCart);

    this.id = id;
    this.quantity = quantity;
    this.productsStoraged = productsStoraged;
  }

  _createClass(AddToCart, [{
    key: "checkStoragedProdcuts",
    value: function checkStoragedProdcuts() {
      var _this = this;

      // check if this product in the cart or no
      var product = this.productsStoraged.find(function (product) {
        return product.id === _this.id;
      });

      if (product) {
        if (product.quantity + this.quantity > 9) product.quantity = 9;else product.quantity = product.quantity + this.quantity;
        localStorage.setItem("cartItems", JSON.stringify(this.productsStoraged));
      } else {
        // push new product in the cart
        this.productsStoraged.push({
          id: this.id,
          quantity: this.quantity
        });
        localStorage.setItem("cartItems", JSON.stringify(this.productsStoraged));
      }
    } // add new cart to Storaged

  }, {
    key: "addNewToSrotage",
    value: function addNewToSrotage() {
      var arr = [];
      arr.push({
        id: this.id,
        quantity: this.quantity
      });
      localStorage.setItem("cartItems", JSON.stringify(arr));
    } // check if products storaged in cart or no

  }, {
    key: "addToStorage",
    value: function addToStorage() {
      if (this.productsStoraged !== null) this.checkStoragedProdcuts();else this.addNewToSrotage();
    }
  }], [{
    key: "changeBtnContent",
    value: function changeBtnContent(target) {
      document.querySelector('.addcart button').classList.add('disapled');
      document.querySelector('.addcart button').innerHTML = "\n            <i class=\"fas fa-spinner fa-spin\"></i> Add\n        ";
      setTimeout(function () {
        target.submit();
      }, 1000);
    }
  }, {
    key: "render",
    value: function render() {
      // get inquirements
      var id = document.querySelector('#bookId').value;
      var quantity = parseInt(document.querySelector('#productQuantity').textContent);
      var productsStoraged = JSON.parse(localStorage.getItem("cartItems")); // return add to cart

      var addToCart = new AddToCart(id, quantity, productsStoraged);
      addToCart.addToStorage();
    }
  }]);

  return AddToCart;
}();

document.querySelector(".addcart").addEventListener('submit', function (e) {
  e.preventDefault(); // handel btn

  AddToCart.changeBtnContent(e.target); // render add to cart

  AddToCart.render();
});