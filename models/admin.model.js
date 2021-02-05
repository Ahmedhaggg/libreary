const Book = require('./schema/product.schema');

exports.addBook = data => {
    return new Promise((resolve, reject) => {
        return Book.findOne({title: data.title})
        .then( result => {
            if (result) { 
                reject('there is a Book with this title')
            } else {
                let book = new Book(data)
                return book.save()
            }
        })
        .then( () => {
            resolve()
        })
        .catch( err => {
            reject(err)
        })
    })
}