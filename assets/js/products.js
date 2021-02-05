class Quantity {
    constructor(quantity, avaliQuantity, addedQuantity) {
        this.quantity = quantity
        this.avaliQuantity = avaliQuantity
        this.addedQuantity = addedQuantity
    }
    removeOpacity() {
        document.querySelector('.quantity-plus').style.opacity = '1'
        document.querySelector('.quantity-minus').style.opacity = '1'
    }
    handelBtns() {
            if (this.quantity === 1)
                document.querySelector('.quantity-minus').style.opacity = '0'
            else if (this.quantity === this.avaliQuantity)
                document.querySelector('.quantity-plus').style.opacity = '0'
            else 
                this.removeOpacity()
    }
    checkQuantity() {
        if ((this.quantity !== this.avaliQuantity && this.addedQuantity === 1) || (this.quantity !== 1 && this.addedQuantity === -1)) {
            this.sumQuantity()
            this.handelBtns()
        }
    }
    sumQuantity() {
        this.quantity = this.quantity + this.addedQuantity
        document.querySelector('.quantity').textContent = this.quantity
    }
    static render(addedQuantity) {
        let quantity = parseInt(document.querySelector('#productQuantity').textContent)
        let avaliQuantity = parseInt(document.querySelector('#availQuantity').value)
        let changeQuantity = new Quantity(quantity, avaliQuantity, addedQuantity)
        changeQuantity.checkQuantity()
    }
}
document.querySelector('.quantity-plus').addEventListener('click', () => {
    Quantity.render(+1)
})
document.querySelector('.quantity-minus').addEventListener('click', () => {
    Quantity.render(-1)
})

class LoadQuantity extends Quantity {
    constructor (quantity, avaliQuantity) {
        super (quantity, avaliQuantity)
    }
    sendQuantity() {
        document.querySelector('#productQuantity').textContent = this.quantity
    }
    static render() {
        let storaged = JSON.parse(localStorage.getItem('cartItems'))
        if (storaged) {
            let bookId = document.querySelector('#bookId').value;
            let bookStoraged  = storaged.find(book => book.id === bookId)
            if (bookStoraged) {
                let avaliQuantity = parseInt(document.querySelector('#availQuantity').value)
                let loadQuantity = new LoadQuantity(bookStoraged.quantity, avaliQuantity)
                loadQuantity.sendQuantity()
                loadQuantity.handelBtns()
            }
        }
    }
}
window.addEventListener('click', LoadQuantity.render())



class AddToCart {
    constructor(id, quantity, productsStoraged) {
        this.id = id
        this.quantity = quantity
        this.productsStoraged = productsStoraged
    }
    checkStoragedProdcuts() {
            // check if this product in the cart or no
            let product = this.productsStoraged.find(product => product.id === this.id)
            if (product) {
                if (product.quantity + this.quantity > 9) 
                    product.quantity = 9
                else 
                    product.quantity = product.quantity + this.quantity
                localStorage.setItem("cartItems", JSON.stringify(this.productsStoraged))
            } else {
                // push new product in the cart
                this.productsStoraged.push({ id: this.id, quantity: this.quantity })
                localStorage.setItem("cartItems", JSON.stringify(this.productsStoraged))
            }
        }
        // add new cart to Storaged
    addNewToSrotage() {
            let arr = []
            arr.push({ id: this.id, quantity: this.quantity })
            localStorage.setItem("cartItems", JSON.stringify(arr))
        }
        // check if products storaged in cart or no
    addToStorage() {
        if (this.productsStoraged !== null) this.checkStoragedProdcuts()
        else this.addNewToSrotage()
    }
    static changeBtnContent(target) {
        document.querySelector('.addcart button').classList.add('disapled')
        document.querySelector('.addcart button').innerHTML =
            `
            <i class="fas fa-spinner fa-spin"></i> Add
        `
        setTimeout(() => {
            target.submit()
        }, 1000)
    }
    static render() {
        // get inquirements
        const id = document.querySelector('#bookId').value
        let quantity = parseInt(document.querySelector('#productQuantity').textContent)
        let productsStoraged = JSON.parse(localStorage.getItem("cartItems"))
            // return add to cart
        let addToCart = new AddToCart(id, quantity, productsStoraged)
        addToCart.addToStorage()
    }
}
document.querySelector(".addcart").addEventListener('submit', e => {
    e.preventDefault()
        // handel btn
    AddToCart.changeBtnContent(e.target)
        // render add to cart
    AddToCart.render()
})