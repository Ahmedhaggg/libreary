const mongoose = require('mongoose')
const User = require('./schema/user.schema') ;
const bcrypt = require('bcrypt');
exports.createUser = data => {
    return new Promise((resolve, reject) => {
        User.findOne({email: data.email})
        .then( user => {
            if(user) 
                reject("This Email is used before");
            else 
                return bcrypt.hash(data.password, 12);
        })
        .then(hashPassword => {
            data.password = hashPassword;
            let user = new User(data);
            return user.save();
        })
        .then(() => {
            resolve("user created")
        })
        .catch( err => {
            reject(err)
        })
        
    })
}

exports.enroll = (email, password) => {
    return new Promise((resolve, reject) => {
        let userData;
        User.findOne({email})
        .then(user => {
            userData = user;
            if (!user)
                reject("This email isn't used");
            else 
                return bcrypt.compare(password ,user.password);
        })
        .then(result => {
            if (!result)
                reject("password is wrong")
            else 
                resolve(userData)
        })
        .catch( err => {
            reject(err)
        })
    })
}

exports.getUserData = userId => {
    
    return User.findById(userId).select("image _id firstName lastName")
        
}