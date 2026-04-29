import { Cart } from "../models/Cart.js";

const cart = new Cart();

const cartCounters = document.querySelectorAll(
  ".mobile-header__cart-count, .header__cart-count",
);

const carousel = document.querySelector(".perfect-set-carousel");

function updateCartCounter() {
  const totalProducts = cart.countProducts();

  cartCounters.forEach((counter) => {
    const isDesktopCounter = counter.classList.contains("header__cart-count");

    counter.textContent = isDesktopCounter
      ? `(${totalProducts})`
      : totalProducts;
  });
}

function handleAddToCart(event) {
  const button = event.target.closest("[data-add-to-cart]");

  if (!button) return;

  const product = {
    id: button.dataset.productId,
    name: button.dataset.productName,
    price: Number(button.dataset.productPrice),
  };

  cart.addProduct(product);
  updateCartCounter();
}

if (carousel) {
  carousel.addEventListener("click", handleAddToCart);
}

updateCartCounter();
