import { Cart } from "../models/Cart.js";

// Seleziona il carosello della sezione "Perfect Set"
const carousel = document.querySelector(".perfect-set-carousel");

// Seleziona tutti i contatori del carrello presenti nell'header desktop e mobile
const cartCounters = document.querySelectorAll(
  ".mobile-header__cart-count, .header__cart-count",
);

// Crea una nuova istanza del carrello
const cart = new Cart();

/**
 * Aggiorna dinamicamente il contatore del carrello
 * nell'header desktop e mobile.
 */
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

/**
 * Estrae i dati del prodotto dal bottone cliccato
 * utilizzando gli attributi data-* HTML.
 */
function getProductFromButton(button) {
  return {
    id: button.dataset.productId,
    name: button.dataset.productName,
    price: Number(button.dataset.productPrice.replace(",", ".")),
    image: button.dataset.productImage,
  };
}

/**
 * Gestisce il click sul pulsante "Aggiungi al carrello".
 */
function handleAddToCartClick(event) {
  const addToCartButton = event.target.closest("[data-add-to-cart]");

  if (!addToCartButton) {
    return;
  }

  event.preventDefault();

  const product = getProductFromButton(addToCartButton);

  cart.addProduct(product);
  cart.save();
  updateCartCounters();
}

// Carica il carrello salvato al caricamento della pagina
cart.load();

// Aggiorna il contatore iniziale del carrello
updateCartCounters();

// Aggiunge il listener solo se il carosello esiste nel DOM
if (carousel) {
  carousel.addEventListener("click", handleAddToCartClick);
}