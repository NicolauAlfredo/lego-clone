import {Cart} from "../models/Cart.js";
import {Product} from "../models/Product.js";

const carrello = new Cart();

const contatoreCarrello = document.querySelectorAll(".mobile-header__cart-count, .header__cart-count");
const carosello = document.querySelector(".perfect-set-carousel");


function updateCartCounter() {
    const contatoreAggiornato = Cart.countProduct();


contatoreCarrello.forEach((counter) => {
    if (counter.classList.contains(".header__cart-count")){
        counter.textContent = contatoreAggiornato;
    } else {
        counter.textContent = contatoreAggiornato;
    }
});
}
updateCartCounter();