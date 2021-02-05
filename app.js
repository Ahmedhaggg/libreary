const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash');

const app = express();
app.use(flash())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect("mongodb://localhost:27017/appone", options ,(err) => err? console.log(err) : console.log("mongodb connecting"))

const store = new SessionStore({
    uri: "mongodb://localhost:27017/appone",
    collection: "sessions"
})
app.use(session({
    secret: "this is blab lab laapgdg bdjgd hsiyie dhidio",
    saveUninitialized: false,
    resave: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 100
    },
    store
}))

app.use(express.static(path.join(__dirname, "assets")))
app.use(express.static(path.join(__dirname, "upload")))

app.set("view engine", "ejs")
app.set("views", "views")


// special middel ware
const authModel = require('./models/auth.model')
app.use(async (req, res, next) => {
    if (req.session.userId) {
        let userData = await authModel.getUserData(req.session.userId);
        if (userData) {
            req.userData = userData;
            next()
        } else {
            res.redirect('/login')
        } 
    } else {
        next()
    }
})
// end special middelware


// application routers
const homeRouter = require('./routers/home.router')
const authRouter = require('./routers/auth.router')
const adminRouter = require('./routers/admin.router')
const cartRouter = require('./routers/cart.router')


// using routers 
app.use('/', homeRouter)
app.use('/', authRouter)
app.use('/', adminRouter)
app.use('/cart', cartRouter)

app.get('/err', (req, res, next) => {
    res.render('error', {
        userData : req.userData ? req.userData : false ,
        userId : req.session.userId,
        isUser : req.session.isUser,
        isAdmin : req.session.isAdmin,
    })
})

app.use((err, req, res, next) => {
    res.redirect('/err')
}) 
const port = process.env.PORT || 9999
app.listen(port, () => console.log("surver running"))
