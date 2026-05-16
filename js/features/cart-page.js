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

            <img
              class="cart-product__favorite"
              src="https://assets.lego.com/icons/v7.11.1/heart.svg"
              alt="Aggiungi ai preferiti"
            />
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
