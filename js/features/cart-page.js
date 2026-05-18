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
const cartIvaElements = document.querySelectorAll("[data-order-iva]");
const cartOrderTotalElements = document.querySelectorAll("[data-order-total]");
const cartOrderItems = document.querySelector("[data-order-items]");
const cartOrderSubtotal = document.querySelector("[data-order-subtotal]");

/**
 * Crea il markup HTML di una card prodotto nel carrello.
 */
function CartCardProduct(product) {
  return `
    <article class="cart-product">
      <a class="cart-product__image-link" href="#">
        <img
          class="cart-product__image"
          src="${product.image}"
          alt="${product.name}"
        />
      </a>

      <div class="cart-product__info">
        <a class="cart-product__title-link" href="#">
          <h3 class="cart-product__title">${product.name}</h3>
        </a>

        <p class="cart-product__price">${formatCurrency(product.price)}</p>

        <div class="cart-product__bottom">
          <div class="cart-product__actions">
            <div class="cart-product__quantity">
              <div class="qty-btn-minus">
                <button
                  class="qty-btn btn-minus"
                  data-btn-minus
                  data-id="${product.id}"
                  type="button"
                  ${product.quantity === 1 ? "disabled" : ""}
                  aria-label="Diminuire quantità"
                ></button>
              </div>

              <span class="qty-num">${product.quantity}</span>

              <div class="qty-btn-plus">
                <button
                  class="qty-btn btn-plus"
                  data-btn-plus
                  data-id="${product.id}"
                  type="button"
                  aria-label="Aumentare quantità"
                ></button>
              </div>
            </div>

            <div class="favorite-popover-wrapper">
      <button
        class="cart-product__favorite"
        type="button"
        aria-label="Aggiungi ${product.name} ai preferiti"
        data-add-to-wishlist
        data-product-id="${product.id}"
        data-product-name="${product.name}"
        data-product-price="${product.price}"
        data-product-image="${product.image}"
      >
        <svg
          class="cart-product__heart-icon"
          viewBox="0 0 40 40"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="m18.063 34.117-.125-.188L7 23.804a9.458 9.458 0 0 1-3-6.938v-.187c0-4.375 3.125-8.188 7.438-9 2.437-.5 4.937.062 7 1.5.562.375 1.062.875 1.562 1.375.25-.25.5-.563.813-.813l.75-.562c2-1.438 4.5-2 6.937-1.5a9.167 9.167 0 0 1 7.5 9v.188c0 2.624-1.125 5.124-3.063 6.937L22 33.929l-.125.188c-.5.437-1.188.75-1.875.75-.75 0-1.375-.313-1.938-.75Zm.875-20.25c-.063 0-.063 0-.063-.063l-1.125-1.25c-1.438-1.625-3.625-2.313-5.75-1.938a6.158 6.158 0 0 0-5 6.063v.188c0 1.812.688 3.5 2 4.687l11 10.188 10.938-10.188A6.289 6.289 0 0 0 33 16.866v-.187c0-2.937-2.125-5.5-5.063-6.062-2.125-.376-4.312.312-5.75 1.937l-1.125 1.25c0 .063 0 .063-.062.125-.25.25-.625.438-1 .438-.438 0-.813-.188-1.063-.438v-.063Z"
          />
        </svg>
      </button>

      <div class="wishlist-modal" data-inline-wishlist-modal>
        <div class="wishlist-modal__content">
          <div
            class="wishlist-modal__lists"
            data-inline-wishlist-modal-lists
          ></div>
        </div>
      </div>
    </div>
          </div>

          <img
            class="cart-product__remove"
            src="https://assets.lego.com/icons/v7.11.1/trash.svg"
            alt="Rimuovi dal carrello"
            data-btn-remove
            data-id="${product.id}"
          />
        </div>
      </div>
    </article>

    <hr class="cart-product__divider" />
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
 * Aggiorna dinamicamente il totale dell'ordine
 * in tutti gli elementi presenti nella pagina.
 */

function updateOrderTotal(total) {
  cartOrderTotalElements.forEach((element) => {
    element.textContent = formatCurrency(total);
  });
}

/**
 * Aggiorna dinamicamente il valore IVA
 * in tutti gli elementi presenti nella pagina.
 */
function updateOrderIva(iva) {
  cartIvaElements.forEach((element) => {
    element.textContent = `Include IVA ${formatCurrency(iva)}`;
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

  // Aggiorna i contatori del carrello nell'header
  // e i dati del riepilogo ordine
  updateCartCounters();

  if (!cartContainer) {
    return;
  }

  // Gestisce il caso in cui il carrello sia vuoto
  if (totalProducts === 0) {
    cartTitle.textContent = "Il mio carrello è vuoto";
    cartContainer.innerHTML = "";
    cartOrderItems.textContent = "Valore ordine (0) articoli";
    cartOrderSubtotal.textContent = formatCurrency(0);
    updateOrderTotal(0);
    updateOrderIva(0);
    return;
  }

  // Aggiorna dinamicamente il riepilogo ordine
  cartTitle.textContent = `Il mio carrello (${totalProducts})`;
  cartOrderItems.textContent = `Valore ordine (${totalProducts}) articoli`;
  cartOrderSubtotal.textContent = formatCurrency(subtotal);
  updateOrderTotal(total);
  updateOrderIva(iva);
  cartContainer.innerHTML = cart.products.map(CartCardProduct).join("");

  document.dispatchEvent(new CustomEvent("favorites:products-rendered"));
}

/**
 * Gestisce i click sui pulsanti del carrello tramite event delegation.
 */
function handleCartClick(event) {
  const increaseProduct = event.target.closest("[data-btn-plus]");
  const decreaseProduct = event.target.closest("[data-btn-minus]");
  const removeProduct = event.target.closest("[data-btn-remove]");

  if (!increaseProduct && !decreaseProduct && !removeProduct) {
    return;
  }

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
