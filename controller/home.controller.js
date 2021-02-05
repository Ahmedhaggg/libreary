const homeModel = require('../models/home.mode')


exports.getHome = async (req, res, next) => {
    let books = await homeModel.getHomeBooks()
    
    res.render('index', {
        userData : req.userData ? req.userData : false ,
        userId : req.session.userId,
        isUser: req.session.isUser,
        isAdmin: req.session.isAdmin,
        books: books
    })
}

exports.getBook = (req, res, next) => {
    let title = req.params.bookName.toString().split('-').join(' ')
    if (title === "c") title = title + "#"; else false;
    homeModel.getBook(title)
    .then( book => {
        console.log(book)
        res.render('book', {
            userData : req.userData ? req.userData : false ,
            userId : req.session.userId,
            isUser : req.session.isUser,
            isAdmin : req.session.isAdmin,
            book : book
        })
    })
    .catch(() => {
        res.render('error', {
            userId : req.session.userId,
            isUser: req.session.isUser,
            isAdmin: req.session.isAdmin,
        })
    })
}