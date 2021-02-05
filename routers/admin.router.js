const router = require('express').Router();
const adminController = require('../controller/admin.controller');
const multer = require('multer')
const check = require('express-validator').check;
router.get('/panel', adminController.getControlPanel)
// storage image of the book
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "." + file.originalname);
    }
});
// filter image of the book
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg')
        cb(null, true);
    else
        cb(null, false);
};
// upload image of the book
const upload = multer({
    storage: storage,
    limits:{ fileSize: 1024 * 1024 * 20 },
    fileFilter: fileFilter
});

let checkInputs = [
    check('title').not().isEmpty().withMessage("can't be empty"),
    check('author').not().isEmpty().withMessage("can't be empty"),
    check('year').not().isEmpty().withMessage("can't be empty"),
    check('category').not().isEmpty().withMessage("can't be empty"),
    check('price').not().isEmpty().withMessage("can't be empty"),
    check('amount').not().isEmpty().withMessage("can't be empty"),
    check('title').not().isEmpty().withMessage("can't be empty"),
    check('description').not().isEmpty().withMessage("can't be empty")
]
router.post('/book/add', 
    upload.single("imageBook"),
    checkInputs,
    adminController.addBook
)
module.exports = router ;
