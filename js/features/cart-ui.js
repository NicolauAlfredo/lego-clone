import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";

const carrello = new Cart();

const contatoreCarrello = document.querySelectorAll(
  ".mobile-header__cart-count, .header__cart-count",
);

const carosello = document.querySelector(".perfect-set-carousel");

function updateCartCounter() {
  const contatoreAggiornato = carrello.countProducts();

  contatoreCarrello.forEach((counter) => {
    const isDesktopCounter = counter.classList.contains("header__cart-count");

    counter.textContent = isDesktopCounter
      ? `(${contatoreAggiornato})`
      : contatoreAggiornato;
  });
}

function aggiungiAlCarrello(event) {
    console.log("Sono entrato nel aggiungi al carrelo")
  const button = event.target.closest("[data-add-to-cart]");

  if (!button) return;

  const prodotto = new Product({
    id: button.dataset.productId,
    name: button.dataset.productName,
    price: Number(button.dataset.productPrice),
    image: button.dataset.productImage,
  });

  carrello.addProduct(prodotto);

  updateCartCounter();
}

if (carosello) {
  carosello.addEventListener("click", aggiungiAlCarrello);
}

updateCartCounter();