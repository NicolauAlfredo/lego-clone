import { formatCurrency } from "../utils/currency.js";
import { Cart } from "../models/Cart.js";

// Crea una nuova istanza del carrello
const cart = new Cart();

// Seleziona il titolo principale della pagina carrello
const cartTitle = document.querySelector("[data-cart-title]");

// Seleziona il contenitore dove verranno renderizzati i prodotti del carrello
const cartContainer = document.querySelector("[data-cart-products]");

// Seleziona tutti i contatori del carrello presenti nell'header desktop e mobile
const cartCounters = document.querySelectorAll(
  ".mobile-header__cart-count, .header__cart-count",
);

// Seleziona gli elementi del riepilogo ordine
const cartIva = document.querySelector("[data-order-iva]");
const cartOrderItems = document.querySelector("[data-order-items]");
const cartOrderSubtotal = document.querySelector("[data-order-subtotal]");
const cartOrderTotal = document.querySelector("[data-order-total]");

/**
 * Crea il markup HTML di una card prodotto nel carrello.
 */
function CartCardProduct(product) {
  return `
    <div class="cart_immagine-scarpa">
      <a href="#">
        <img
          src="${product.image}"
          alt="${product.name}"
        />
      </a>

      <div class="cart_scarpa-info">
        <a href="#">
          <h3>${product.name}</h3>
        </a>

        <p>${formatCurrency(product.price)}</p>

        <div class="cart_bottoni-wrapper">
          <div class="cart_bottoni">
            <div class="qty-btn-minus">
              <button
                class="qty-btn btn-minus"
                data-btn-minus
                data-id="${product.id}"
                type="button"
                ${product.quantity === 1 ? "disabled" : ""}
              ></button>
            </div>

            <span class="qty-num">${product.quantity}</span>

            <div class="qty-btn-plus">
              <button
                class="qty-btn btn-plus"
                data-btn-plus
                data-id="${product.id}"
                type="button"
              ></button>
            </div>
          </div>

          <img
            class="cart-heart-icon"
            src="https://assets.lego.com/icons/v7.11.1/heart.svg"
            alt="Preferiti"
          />

          <img
            class="cart-trash-icon"
            src="https://assets.lego.com/icons/v7.11.1/trash.svg"
            alt="Rimuovi dal carrello"
            data-btn-remove
            data-id="${product.id}"
          />
        </div>
      </div>
    </div>

    <hr class="hr-due" />
  `;
}

/**
 * Aggiorna i contatori del carrello nell'header desktop e mobile.
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
 * Renderizza la pagina del carrello.
 */
function renderCartProducts() {
  cart.load();

  const totalProducts = cart.countProducts();
  const subtotal = cart.calculateSubtotal();
  const total = cart.calculateTotal();
  const iva = cart.calculateIva();

  updateCartCounters();

  if (!cartContainer) {
    return;
  }

  if (totalProducts === 0) {
    cartTitle.textContent = "Il mio carrello è vuoto";
    cartContainer.innerHTML = "";
    cartOrderItems.textContent = "Valore ordine (0) articoli";
    cartOrderSubtotal.textContent = formatCurrency(0);
    cartOrderTotal.textContent = formatCurrency(0);
    cartIva.textContent = `Include IVA ${formatCurrency(0)}`;
    return;
  }

  cartTitle.textContent = `Il mio carrello (${totalProducts})`;
  cartOrderItems.textContent = `Valore ordine (${totalProducts}) articoli`;
  cartOrderSubtotal.textContent = formatCurrency(subtotal);
  cartOrderTotal.textContent = formatCurrency(total);
  cartIva.textContent = `Include IVA ${formatCurrency(iva)}`;
  cartContainer.innerHTML = cart.products.map(CartCardProduct).join("");
}

/**
 * Gestisce i click sui pulsanti del carrello tramite event delegation.
 */
function handleCartClick(event) {
  const increaseProduct = event.target.closest("[data-btn-plus]");
  const decreaseProduct = event.target.closest("[data-btn-minus]");
  const removeProduct = event.target.closest("[data-btn-remove]");

  cart.load();

  if (increaseProduct) {
    cart.increaseProductQuantity(increaseProduct.dataset.id);
  }

  if (decreaseProduct) {
    cart.decreaseProductQuantity(decreaseProduct.dataset.id);
  }

  if (removeProduct) {
    cart.removeProduct(removeProduct.dataset.id);
  }

  cart.save();
  renderCartProducts();
}

// Aggiunge il listener solo se il contenitore del carrello esiste nel DOM
if (cartContainer) {
  cartContainer.addEventListener("click", handleCartClick);
}

// Render iniziale della pagina carrello
renderCartProducts();
