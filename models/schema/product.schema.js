const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    author: {
        type: String,
        required: true
    }, 
    year: {
        type: String,
        required: true
    }, 
    category: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    }, 
    amount: {
        type: Number,
        required: true
    }, 
    discount: {
        type: Number
    },
    description: {
        type: String,
        required: true
    }, 
    fileName: {
        type: String,
        required: true
    }, 
    timeStamp: {
        type: String,
        required: true
    }, 
    sales: {
        type: Array,
        default:[]
    },
    rating: {
        type: [
            {
                client: mongoose.Schema.Types.ObjectId,
            }
        ],
        default: []
    },
    totalRating: {
        type: Number,
        default: 0
    },
    feedback: {
        type: [
            {
                clientid: mongoose.Schema.Types.ObjectId,
            }
        ],
        default: []
    }
    
})

const Product = mongoose.model("book", productSchema)
module.exports = Product ;