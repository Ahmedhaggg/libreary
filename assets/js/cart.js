class GetCart {
    static totalPrice = 0
    static booksId = []
    getIdList() {
        JSON.parse(localStorage.getItem('cartItems')).forEach(book => {
            GetCart.booksId.push(book.id)
        });
    }
    renderConent(books) {
        let content = books.map(book => {
            let qunatity = JSON.parse(localStorage.getItem("cartItems")).find(item =>  item.id === book._id).quantity
            let lastPrice= (qunatity * book.price) - (qunatity * ((book.price * book.discount) / 100 ))
            GetCart.totalPrice += lastPrice;
            return `
                <div class="row align-items-center cart-header cart-item text-center py-2 mb-3">
                    <div class="col-md-3">
                        <img src="/${book.fileName}" alt="">
                    </div>
                    <div class="col-md-2">${book.title}</div>
                    <div class="col-md-3">
                        <div class="quantity-controls d-flex justify-content-center" id="${book._id}">
                            <span class="mr-2 quantity-minus" onclick="Quantity.render(-1, ${book.amount}, '${book._id}','minus')">-</span>
                            <span class="ml-2 quantity">${
                                qunatity 
                            }</span>
                            <span class="ml-3 quantity-plus" onclick="Quantity.render(1, ${book.amount}, '${book._id}' ,'plus')">+</span>
                        </div>
                    </div>
                    <div class="col-md-2 lastPrice">${lastPrice}$</div>
                    <div class="col-md-2">
                        <button class="btn delete shadow-none" onclick="deleteCartItem('${book._id}')">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div> 
            `
        })
        document.querySelector('.cart .container').innerHTML = `
                <div class="row cart-header text-center py-3 mb-3">
                    <div class="col-md-3">image</div>
                    <div class="col-md-2">name</div>
                    <div class="col-md-3">quantity</div>
                    <div class="col-md-2">Total Price</div>
                    <div class="col-md-2">edit</div>
                </div>   
                ${content.map(book => {return book})}
                
        `
        this.handelTotal(books, GetCart.totalPrice)
    }

    handelTotal(books, totalPrice) {
        let totalBooks = books.length;
        let storaged = localStorage.getItem('cartItems')
        console.log(storaged)
        if(totalPrice > 0) {
            document.querySelector('.cart').innerHTML += `
                <div class="total-cart">
                    <div class="container">
                        <div class="row cart-header py-3 bg-light text-center">
                            <div class="col-md-3">${totalBooks}</div>
                            <div class="col-md-2 offset-md-7">${totalPrice}$</div>
                        </div>
                        <form class="text-center mt-4" id="check-out" method="POST" action="/cart/books/check">
                            <input type="hidden" value=${storaged} name="list">
                            <button class="btn btn-special shadow-none" type="submit" >Payment ${totalPrice}$</button>
                        </form>
                    </div>
                </div>
            `
            document.querySelector('#check-out').addEventListener('submit', e => {
                e.preventDefault();
                e.target.children[1].classList.add('disapled')
                e.target.children[1].innerHTML =
                `
                    <i class="fas fa-spinner fa-spin"></i> checkOut
                `
                setTimeout(() => {
                    e.target.submit()
                }, 1000)
            })
        }
    }
    async fetchCart() { 
        if(localStorage.getItem('cartItems') !== null) {
            await this.getIdList()
            fetch('/cart/content', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({booksId: GetCart.booksId})
            })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
            })
            .then(result => {
                this.renderConent(result.books)
            })
            .catch(err => {
                console.log(err)
                // window.location.hash = "localhost:9999/err"
            })
        }
    }
}
window.addEventListener('load', () => {
    let getCart = new GetCart()
    getCart.fetchCart()
})


class Quantity {
    constructor(count,sum, availQuantity, id, type) {
        this.count = count
        this.sum = sum
        this.availQuantity = availQuantity
        this.id = id
        this.type = type
    }
    handelStorage() {
        let storagedBooks = JSON.parse(localStorage.getItem('cartItems'))
        storagedBooks.find(book => book.id === this.id ? book.quantity = this.count : false)
        localStorage.setItem("cartItems", JSON.stringify(storagedBooks))
    }
    checkQuantity() {
        document.getElementById(this.id).children[0].style.opacity = '1',
        document.getElementById(this.id).children[2].style.opacity = '1'
        this.count === this.availQuantity && this.type === "plus" ? document.getElementById(this.id).children[2].style.opacity = '.4' : 
        this.count === 1  && this.type === "minus" ? document.getElementById(this.id).children[0].style.opacity = '.4'
        : this.count = this.count + this.sum
        document.getElementById(this.id).children[1].textContent = this.count
        this.handelStorage()
    }
    static render (sum, availQuantity, id, type) {
        let count = parseInt(document.getElementById(id).children[1].textContent)
        let qunatity = new Quantity(count ,sum, availQuantity, id, type)
        qunatity.checkQuantity()
    }
}
const checkCartEmpty = () => {
    let cartItems = document.querySelectorAll('.cart-item')
    let cartEmpty = `<div class="cart-empty" style="text-align: center;
    font-size: 45px;
    font-weight: 700;
    color: #999999;
    padding-top: 100px;
    ">
        <i class="fas fa-shopping-cart"></i>
        <span class="d-block">Empty Cart</span>
    </div>`
    cartItems.length == 0 ? document.querySelector('.cart .container').innerHTML = cartEmpty
    : false ;
}
const deleteCartItem = (id) => {
    const removeLastItem = () => {
        localStorage.removeItem('cartItems')
        document.getElementById(id).parentElement.parentElement.previousElementSibling.remove();
        document.getElementById(id).parentElement.parentElement.remove();
        document.querySelector('.total-cart').remove()
        checkCartEmpty()
    }
    const removeItem = () => {
        localStorage.setItem('cartItems', JSON.stringify(storagedBooks))
        document.getElementById(id).parentElement.parentElement.remove();
    }
    let storagedBooks = JSON.parse(localStorage.getItem('cartItems'))
    let i = storagedBooks.findIndex(book => book.id === id)
    storagedBooks.splice(i, 1)
    storagedBooks.length == 0 ? removeLastItem()  :removeItem() ;  
}
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        checkCartEmpty()
    }, 300)
});

