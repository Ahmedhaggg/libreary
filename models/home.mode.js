const User = require('../models/schema/user.schema');
const Product = require('./schema/product.schema');
exports.getHomeBooks = async () => {
    let topRating = await Product.find().sort({totalRating: -1}).limit(8).select('id title price fileName totalRating')
    let bestSellar = await Product.find().sort({sales: -1}).limit(8).select('id title price fileName totalRating')
    let newProducts = await Product.find().sort({year: -1}).limit(8).select('id title price fileName totalRating')
    return {topRating, bestSellar, newProducts}
}

exports.getBook = title => {
    return new Promise((resolve, reject) => {
        return Product.findOne({title})
        .then(book => {
            if(book) resolve(book); else  reject()
        })
        .catch(() => {
            reject()
        })
    })
}