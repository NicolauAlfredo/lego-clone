import { Cart } from "../models/Cart.js";

const carousel = document.querySelector(".perfect-set-carousel");

const cartCounters = document.querySelectorAll(
  ".mobile-header__cart-count, .header__cart-count",
);

const cart = new Cart();

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart.products));
}

function loadCart() {
  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.products = savedCart;
}

function updateCartCounters() {
  const totalItems = cart.countProducts();

  cartCounters.forEach((counter) => {
    if (counter.classList.contains("header__cart-count")) {
      counter.textContent = `(${totalItems})`;
    } else {
      counter.textContent = totalItems;
    }
  });
}

function getProductFromButton(button) {
  return {
    id: button.dataset.productId,
    name: button.dataset.productName,
    price: Number(button.dataset.productPrice.replace(",", ".")),
    image: button.dataset.productImage,
  };
}

function handleAddToCartClick(event) {
  const addToCartButton = event.target.closest("[data-add-to-cart]");
 
  // Entra nel carrello ma non prende alcun dato se non si clicka nel bottone 
  // console.log("Sono entrato nel carrello")
  
  
   if (!addToCartButton) {
    return;
  }

  event.preventDefault();

  const product = getProductFromButton(addToCartButton);

  cart.addProduct(product);
  saveCart();
  updateCartCounters();

  console.log("Carrello aggiornato:", cart.products);
  console.table(cart.products);
}

loadCart();
updateCartCounters();

if (carousel) {
  carousel.addEventListener("click", handleAddToCartClick);
}

updateCartCounters();