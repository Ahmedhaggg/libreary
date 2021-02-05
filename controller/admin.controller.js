const multer = require('multer');
const fs = require('fs')
const validationResult = require('express-validator').validationResult;
const adminModel = require('../models/admin.model');
exports.getControlPanel = (req, res, next) => {
    res.render('panel', {
        addBookErr: req.flash("addBookErr")[0],
        addBookCompeletly :req.flash("addBookCompeletly")[0]
    })
}
exports.addBook = (req, res, next) => {
    
    if(validationResult(req).array().length > 0) {
        if (req.file) {
            fs.unlinkSync(req.file.path)
        }
        req.flash("addBookErr", "can't added product you should complete a fields")
        res.redirect('/panel')
    } else {
        req.body.discount ? req.body.discount : 0
        const {title, author, year, category, price, amount, discount, description} = req.body
        const fileName = req.file.filename
        var today = new Date();
        var timeStamp = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear()
        adminModel.addBook({title, author, year, category, price, amount, discount, description, fileName, timeStamp})
        .then(() => {
            req.flash("addBookCompeletly", "book is added")
            res.redirect('/panel')
        })
        .catch(err => {
            if (req.file) {
                fs.unlinkSync(req.file.path)
            }
            req.flash("addBookErr", err)
            res.redirect('/panel')
        })
    }
    
}