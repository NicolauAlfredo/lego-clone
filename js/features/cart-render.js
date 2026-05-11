import { formatCurrency } from "../utils/currency.js"
import { Cart } from "../models/Cart.js";


const cartCounters = document.querySelector(".cart-totale")

const cartContainer = document.querySelector(".cart-products")

const products = getCartProducts()


// Recupera i prodotti salvati ne Local Storage
function getCartProducts (){
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Funzione di render della card prodotto nel carrello (da sistemare non appena la pagina Cart.html sarà pronta)
function CartCardProduct(product){
    return `
        <article class="card-product">
        <div class="card-product__img">
          <img src="${product.image
          }" alt="${product.name}">
        </div>
        <div class="card-product__info">
          <a class="card-product__name">${product.name}</a>
          <p class="card-product__price">${formatCurrency(product.price)}</p>
          <div class="card-product__quantity">
            <button class="card-product__quantity-btn" type="button"><img src="../assets/global/icons/minus-icon.svg" alt="minus"></button>
            <input type="number" name="product-quantity" id="product-quantity" value="${product.quantity}">
            <button class="card-product__quantity-btn" type="button"><img src="../assets/global/icons/plus-icon.svg" alt="plus"></button>
          </div>
            <div class="card-product__favorite">
              <button type="button" class="card-product__favorite-btn"><img src="/assets/global/icons/heart-icon.svg" alt="Favorite"></button>
            </div>
          </div>
        <button><img src="../assets/global/icons/trash-icon.svg" alt="Trash"></button>
        <div>

        </div>
      </article>
    `
}

// Calcola il prezzo totale del prodotto
function calcolateCartTotal(products){
    return products.reduce((total, product) => {
        return total + product.price * product.quantity
    })
}

// Calcola il numero dei prodotti
function calculateTotalProducts(products) {
        return products.reduce((total, product) => {
        return total + product.quantity
    }, 0);
}

function renderCartProducts(){
    const product = getCartProducts();
    const totalProdcuts = calculateTotalProducts(products);
    if (!cartContainer){
        return
    } 
    if(totalProdcuts.length != 0){
        cartCounters.textContent =  `Il mio carrello (${totalProdcuts})`
    }
}

cartContainer.innerHTML = products.map(CartCardProduct).join("")

console.log("Prodotti renderizzati nel carrello", products)
console.table(products)

renderCartProducts()