const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String, 
        required: true
    }, 
    lastName: {
        type: String, 
        required: true
    }, 
    city: {
        type: String, 
        required: true
    }, 
    country: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    }, 
    image: {
        type: String,
        default: "user.png"
    },
    isUser: {
        type: Boolean,
        default: true
    }    
    ,
    isAdmin: {
        type: Boolean,
        default: false
    }
})

const user = mongoose.model("user", userSchema)

module.exports = user ;