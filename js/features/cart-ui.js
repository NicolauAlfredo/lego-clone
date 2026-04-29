import { Cart } from "../models/Cart.js";

const cart = new Cart();

const cartCounter = document.querySelector(".mobile-header__cart-count");
const carousel = document.querySelector(".perfect-set-carousel");

function updateCartCounter() {
  if (!cartCounter) return;

  cartCounter.textContent = cart.countProducts();
}

function handleAddToCart(event) {
  const button = event.target.closest("[data-add-to-cart]");

  if (!button) return;

  const product = {
    id: button.dataset.productId,
    name: button.dataset.productName,
    price: Number(button.dataset.productPrice),
  };

  console.log("Prodotto aggiunto:", product);

  cart.addProduct(product);
  updateCartCounter();
}

if (carousel) {
  carousel.addEventListener("click", handleAddToCart);
}

updateCartCounter();
