const cartModel = require('../models/cart.model');
const reqIp = require('request-ip');
exports.getCart = (req, res, next) => {
    res.render('cart', {
        userData : req.userData ? req.userData : false ,
        userId : req.session.userId,
        isUser : req.session.isUser,
        isAdmin : req.session.isAdmin,
    })
}
exports.getCartItems = (req, res, next) => {
    console.log(req.connection.remoteAddress)
    if (req.body.booksId) {
        cartModel.getCartItems(req.body.booksId)
        .then( books => {
            res.status(200).json({
                books: books
            })
        })
        .catch( err => {
            res.status(404).json({
                err: err
            })
        })
    } 
}

exports.checkBooks = (req, res, next) => {
    let {list} = req.body;
    let books = JSON.parse(list)
    console.log(list)
    cartModel.verifyBooks(books)
    .then(result => {
        if (result && result.length > 0) {
            
        } 
    })
    .catch(err => {
        console.log(err)
    }) 
    
}