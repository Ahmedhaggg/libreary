const mongoose  = require('mongoose');
const Product = require('./schema/product.schema');

exports.getCartItems = booksId => {
    return new Promise((resolve, reject) => {
        Product.find({_id: booksId}).select('title amount price fileName discount')
        .then( books => {
            resolve(books)
        })
        .catch( err => {
            reject(err)
        })
    })
}

exports.verifyBooks = books => {
    let booksId = books.map(book => book.id)
    
    return new Promise((resolve, reject) => {
        Product.find().where('_id').in(booksId)
        .then(books => {
             resolve(books)
        })
        .catch( err => {
            resolve(err)
        })
    })
}