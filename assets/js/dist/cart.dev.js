"use strict";

function myFun() {
  var booksId = [];
  JSON.parse(localStorage.getItem('cartItems')).forEach(function (book) {
    booksId.push(book.id);
  });
  console.log(JSON.stringify(booksId));
  console.log(booksId);
  fetch('/cart/content', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      booksId: booksId
    })
  }).then(function (response) {
    if (response.status === 200) {
      return response.json();
    }
  }).then(function (books) {
    console.log(books);
  })["catch"](function (err) {
    console.log(err); // window.location.hash = "localhost:9999/err"
  });
}

document.querySelector('button').addEventListener('click', myFun);