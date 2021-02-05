const router = require('express').Router();
const authController = require('../controller/auth.controller')
const check = require('express-validator').check;



let  validSignup = [ 
    check("firstName").isLength({min: 3, max: 20}).withMessage("there is no name"),
    check("lastName").isLength({min: 3, max: 20}).withMessage("there is no name"),
    check("city").not().isEmpty().withMessage("can't be empty"),
    check("country").not().isEmpty().withMessage("can't be empty"),
    check("email").matches(".com" && "@").withMessage("can't be email").isEmail().withMessage("can't be email"),
    check("gender").not().isEmpty().withMessage("can you choose your gender").matches("female" && "male").withMessage("should choose male or female"),
    check("password").not().isEmpty().withMessage("can't be empty").isLength({min: 9}).withMessage("cant be less thant 9 letters").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/).withMessage("should has a capital letter and small letter and signs"),
    check("confirm").not().isEmpty().withMessage("can't be empty"),
]

let validLogin = [
    check("email").matches(".com" && "@").withMessage("can't be email").isEmail().withMessage("can't be email"),
    check("password").not().isEmpty().withMessage("can't be empty").isLength({min: 9}).withMessage("cant be less thant 9 letters").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/).withMessage("should has a capital letter and small letter and signs")
]


router.get('/sign',authController.getSign)
router.post('/sign', 
    validSignup,
    authController.createUser
)
router.get('/login', authController.getLogin)
router.post('/login', 
    validLogin,
    authController.enroll
)
router.post('/logout', authController.logout)
module.exports = router ;