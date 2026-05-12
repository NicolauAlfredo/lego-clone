import { Cart } from "./Cart.js";
const cart = new Cart();
const h1 = document.querySelector(".cart_title");
h1.innerText = `il mio carrello (${cart.countProducts()})`;
// Funzione per aggiornare il titolo del carrello con il numero di prodotti da chiamare con event listener
function refreshCart() {
  h1.innerText = `il mio carrello (${cart.countProducts()})`;
}
//funzione per rimuovere un prodotto dal carrello
export function removeFromCart(productId) {
  cart.removeProduct(productId);
  refreshCart();
}
//funzione che aggiunge un prodotto al carrello e aggiorna il titolo
export function addToCart(product) {
  cart.addProduct(product);
  refreshCart();
}
