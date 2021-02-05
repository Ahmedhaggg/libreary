const validationResult = require('express-validator').validationResult;
const authModel = require('../models/auth.model')
// get page to sign up
exports.getSign = (req, res, next) => {
    res.render("signup", {
        emailUsed: req.flash("emailUsed"),
        authError: req.flash("authError"),
        values: req.flash("values")[0],
        isUser: false,
        isAdmin: false,
        userId: false
    })
}

// create a user



exports.createUser = async (req, res, next) => {
    if (validationResult(req).array().length > 0) {
        // check error is completly or no
        let {firstName, lastName, city, email} = req.body
        let values = {firstName, lastName, city, email}
        await req.flash("authError", validationResult(req).array())
        await req.flash("values", values)
        res.redirect('/sign')

    } else if (req.body.password !== req.body.confirm) {
        // check password is confirmed or no
        let {firstName, lastName, city, email} = req.body
        let values = {firstName, lastName, city, email}
        await req.flash("authError", {param: "confirm", msg: "you should confirm password"})
        await req.flash("values", values)
        res.redirect('/sign')

    } else {
        const data = {firstName, lastName, city, country, email, password, gender} = req.body
        
        authModel.createUser(data)
            .then(() => {
                res.redirect('/')
            })
            .catch(err => {
                req.flash("emailUsed", err)
                res.redirect('/sign')
            })
    }
}

// get page for login
exports.getLogin = (req, res, next) => {
    res.render('login', {
        authError: req.flash("authError"),
        enrollError: req.flash("emailErr"),
        values : req.flash("values")[0],
        isUser: false,
        isAdmin: false,
        userId: false
    })
}

// get a page for enroll in
exports.enroll = async (req, res, next) => {
    if (validationResult(req).array().length > 0) {
        const {email} = req.body;
        console.log(validationResult(req).array())
        await req.flash("values", {email})
        await  req.flash("authError", validationResult(req).array())
        res.redirect('/login')
    } else {
        const {email, password} = req.body;
        authModel.enroll(email, password)
            .then( user => {
                req.session.userId = user.id,
                req.session.isUser = user.isUser,
                req.session.isAdmin = user.isAdmin
                res.redirect('/')
            })
            .catch(err => {
                req.flash("values", {email})
                req.flash("emailErr", err)
                res.redirect('/login')
            })
    }
}

exports.logout = (req, res, next) => {
    req.session.destroy()
    res.redirect('/')
}