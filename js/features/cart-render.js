import { formatCurrency } from "../utils/currency.js";
import { Cart } from "../models/Cart.js";

const cartTitle = document.querySelector("[data-cart-title]");

const cartContainer = document.querySelector("[data-cart-products]");

const cartCounters = document.querySelectorAll(
  ".mobile-header__cart-count, .header__cart-count",
);

const cartIva = document.querySelector("[data-order-iva]");
const cartOrderItems = document.querySelector("[data-order-items]");
const cartOrderSubtotal = document.querySelector("[data-order-subtotal]");
const cartOrderTotal = document.querySelector("[data-order-total]");

const products = getCartProducts();

// Recupera i prodotti salvati ne Local Storage
function getCartProducts() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart
function saveCart(products) {
  localStorage.setItem("cart", JSON.stringify(products));
}

// Funzione di render della card prodotto nel carrello (da sistemare non appena la pagina Cart.html sarà pronta111)
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

// Calcola il prezzo totale del prodotto
function calculateTotalPrice(products) {
  return products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
}

// Calcola il numero dei prodotti
function calculateTotalProducts(products) {
  return products.reduce((total, product) => {
    return total + product.quantity;
  }, 0);
}

// Update il numero della quantità nel carrello
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

//Add to card e remove to card
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

// Funzione di rendering
function renderCartProducts() {
  const products = getCartProducts();
  const totalProdcuts = calculateTotalProducts(products);
  const totalPrice = calculateTotalPrice(products);
  const iva = totalPrice * 0.22;

  updateCartCounters(products);

  if (!cartContainer) {
    return;
  }
  if (totalProdcuts === 0) {
    cartTitle.textContent = `Il mio carrello è vuoto`;
    cartContainer.innerHTML = "";
    cartOrderItems.textContent = `Valore ordine (0) articoli `;
    cartOrderSubtotal.textContent = formatCurrency(0);
    cartOrderTotal.textContent = formatCurrency(0);
    cartIva.textContent = `Include IVA ${formatCurrency(0)}`;
  }

  cartTitle.textContent = `Il mio carrello (${totalProdcuts})`;
  cartOrderItems.textContent = `Valore ordine (${totalProdcuts}) articoli`;
  cartOrderSubtotal.textContent = formatCurrency(totalPrice);
  cartOrderTotal.textContent = formatCurrency(totalPrice);
  cartIva.textContent = `Include IVA ${formatCurrency(iva)} `;
  cartContainer.innerHTML = products.map(CartCardProduct).join("");
}

cartContainer.addEventListener("click", (event) => {
  const increaseProdcut = event.target.closest("[data-btn-plus]");
  const decreaseProduct = event.target.closest("[data-btn-minus]");

  if (increaseProdcut) {
    const productId = increaseProdcut.dataset.id;
    increaseProductQuantiy(productId);
  }
  if (decreaseProduct) {
    const productId = decreaseProduct.dataset.id;
    decreaseProductQuantiy(productId);
  }
});

console.table(products);

renderCartProducts();
