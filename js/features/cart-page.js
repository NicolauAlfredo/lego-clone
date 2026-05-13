import { formatCurrency } from "../utils/currency.js"; 

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

// Recupera i prodotti iniziali salvati nel localStorage
const products = getCartProducts();

/**
 * Recupera i prodotti salvati nel localStorage.
 *
 * Se non esistono prodotti salvati,
 * restituisce un array vuoto.
 */
function getCartProducts() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

/**
 * Salva lo stato aggiornato del carrello nel localStorage.
 *
 * @param {Array} products - Lista aggiornata dei prodotti nel carrello.
 */
function saveCart(products) {
  localStorage.setItem("cart", JSON.stringify(products));
}

/**
 * Crea il markup HTML di una card prodotto nel carrello.
 *
 * Ogni card contiene:
 * - immagine del prodotto
 * - nome del prodotto
 * - prezzo formattato
 * - pulsanti per aumentare o diminuire la quantità
 * - icona preferiti
 * - icona rimozione prodotto
 *
 * @param {Object} product - Prodotto da renderizzare.
 * @returns {string} Markup HTML della card prodotto.
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
          />
        </div>
      </div>
    </div>

    <hr class="hr-due" />
  `;
}

/**
 * Calcola il prezzo totale dei prodotti nel carrello.
 *
 * Il totale tiene conto della quantità di ogni prodotto.
 *
 * @param {Array} products - Lista dei prodotti nel carrello.
 * @returns {number} Prezzo totale del carrello.
 */
function calculateTotalPrice(products) {
  return products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
}

/**
 * Calcola il numero totale di articoli nel carrello.
 *
 * Somma le quantità di tutti i prodotti presenti.
 *
 * @param {Array} products - Lista dei prodotti nel carrello.
 * @returns {number} Numero totale di articoli.
 */
function calculateTotalProducts(products) {
  return products.reduce((total, product) => {
    return total + product.quantity;
  }, 0);
}

/**
 * Aggiorna i contatori del carrello nell'header desktop e mobile.
 *
 * Desktop:
 * (3)
 *
 * Mobile:
 * 3
 *
 * @param {Array} products - Lista dei prodotti nel carrello.
 */
function updateCartCounters(products) {
  const totalItems = calculateTotalProducts(products);

  cartCounters.forEach((counter) => {
    if (counter.classList.contains("header__cart-count")) {
      counter.textContent = `(${totalItems})`;
    } else {
      counter.textContent = totalItems;
    }
  });
}

/**
 * Aumenta di 1 la quantità del prodotto selezionato.
 *
 * Dopo l'aggiornamento:
 * - salva il carrello nel localStorage
 * - renderizza nuovamente la pagina carrello
 *
 * @param {string} productId - ID del prodotto da aggiornare.
 */
function increaseProductQuantiy(productId) {
  const products = getCartProducts();

  const updateProducts = products.map((product) => {
    if (product.id === productId) {
      return {
        ...product,
        quantity: product.quantity + 1,
      };
    }

    return product;
  });

  saveCart(updateProducts);
  renderCartProducts();
}

/**
 * Diminuisce di 1 la quantità del prodotto selezionato.
 *
 * Se la quantità è già 1, il prodotto non viene modificato.
 *
 * Dopo l'aggiornamento:
 * - salva il carrello nel localStorage
 * - renderizza nuovamente la pagina carrello
 *
 * @param {string} productId - ID del prodotto da aggiornare.
 */
function decreaseProductQuantiy(productId) {
  const products = getCartProducts();

  const updateProducts = products
    .map((product) => {
      if (product.id === productId) {
        if (product.quantity === 1) {
          return product;
        }

        return {
          ...product,
          quantity: product.quantity - 1,
        };
      }

      return product;
    })
    .filter((product) => product.quantity > 0);

  saveCart(updateProducts);
  renderCartProducts();
}

/**
 * Renderizza la pagina del carrello.
 *
 * Logica:
 * - recupera i prodotti dal localStorage
 * - calcola quantità totale
 * - calcola subtotal, totale e IVA
 * - aggiorna il titolo della pagina
 * - aggiorna il riepilogo ordine
 * - renderizza le card prodotto
 * - gestisce lo stato del carrello vuoto
 */
function renderCartProducts() {
  const products = getCartProducts();
  const totalProducts = calculateTotalProducts(products);
  const totalPrice = calculateTotalPrice(products);
  const iva = totalPrice * 0.22;

  updateCartCounters(products);

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
  cartOrderSubtotal.textContent = formatCurrency(totalPrice);
  cartOrderTotal.textContent = formatCurrency(totalPrice);
  cartIva.textContent = `Include IVA ${formatCurrency(iva)}`;
  cartContainer.innerHTML = products.map(CartCardProduct).join("");
}

// Gestisce i click sui pulsanti di quantità del carrello tramite event delegation
cartContainer.addEventListener("click", (event) => {
  const increaseProduct = event.target.closest("[data-btn-plus]");
  const decreaseProduct = event.target.closest("[data-btn-minus]");

  if (increaseProduct) {
    const productId = increaseProduct.dataset.id;
    increaseProductQuantiy(productId);
  }

  if (decreaseProduct) {
    const productId = decreaseProduct.dataset.id;
    decreaseProductQuantiy(productId);
  }
});

// Debug: mostra in console i prodotti caricati dal localStorage
console.table(products);

// Render iniziale della pagina carrello
renderCartProducts();
