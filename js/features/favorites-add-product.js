import { Wishlist } from "../models/Wishlist.js";
import { formatCurrency } from "../utils/currency.js";

const wishlist = new Wishlist();

const createListButton = document.querySelector("[data-create-wishlist-list]");
const wishlistSummaryContainer = document.querySelector(
  "[data-wishlist-lists]",
);
const wishlistModal = document.querySelector("[data-wishlist-modal]");
const wishlistModalLists = document.querySelector(
  "[data-wishlist-modal-lists]",
);
const wishlistModalClose = document.querySelector(
  "[data-wishlist-modal-close]",
);

let selectedProduct = null;

/**
 * Formatta una data ISO nel formato italiano.
 */
function formatDate(date) {
  return new Intl.DateTimeFormat("it-IT").format(new Date(date));
}

/**
 * Estrae i dati del prodotto dal bottone cuore cliccato.
 */
function getProductFromButton(button) {
  return {
    id: button.dataset.productId,
    name: button.dataset.productName,
    price: Number(button.dataset.productPrice),
    image: button.dataset.productImage,
  };
}

/**
 * Crea una nuova lista dei desideri.
 *
 * Per ora usiamo prompt per semplificare.
 * Depois você pode substituir por um modal mais bonito.
 */
const createWishlistModal = document.querySelector(
  "[data-create-wishlist-modal]",
);

const createWishlistForm = document.querySelector(
  "[data-create-wishlist-form]",
);

const closeCreateWishlistModalButton = document.querySelector(
  "[data-close-create-wishlist-modal]",
);

const wishlistNameInput = document.querySelector("#wishlist-name");

/**
 * Apre il modal di creazione lista.
 */
function openCreateWishlistModal() {
  if (!createWishlistModal) {
    return;
  }

  createWishlistModal.classList.add("is-open");

  requestAnimationFrame(() => {
    wishlistNameInput.focus();
  });
}

/**
 * Chiude il modal di creazione lista.
 */
function closeCreateWishlistModal() {
  if (!createWishlistModal) {
    return;
  }

  createWishlistModal.classList.remove("is-open");

  createWishlistForm.reset();
}

/**
 * Gestisce il submit del form.
 */
function handleCreateWishlistSubmit(event) {
  event.preventDefault();

  const formData = new FormData(createWishlistForm);

  const listName = formData.get("wishlistName")?.trim();

  if (!listName) {
    return;
  }

  wishlist.createList(listName);

  renderWishlistLists();

  closeCreateWishlistModal();
}

/**
 * Renderizza le liste nella pagina Lista dei desideri.
 */
function renderWishlistLists() {
  wishlist.load();

  const lists = wishlist.getLists();

  if (!wishlistSummaryContainer) {
    return;
  }

  wishlistSummaryContainer.innerHTML = lists
    .map((list) => {
      const total = wishlist.calculateListTotal(list.id);

      return `
        <section class="wishlist-summary">
          <div class="wishlist-summary__info">
            <a href="#" class="wishlist-summary__name">
              ${list.name} (${list.products.length})
            </a>

            <p>Ultimo aggiornamento: ${formatDate(list.updatedAt)}</p>

            <strong>Costo totale: ${formatCurrency(total)}</strong>
          </div>

          <div class="wishlist-summary__products">
            ${list.products
              .slice(0, 5)
              .map((product) => {
                return `
                  <img src="${product.image}" alt="${product.name}" />
                `;
              })
              .join("")}

            ${
              list.products.length > 5
                ? `<div class="wishlist-summary__extra">+${list.products.length - 5}</div>`
                : ""
            }
          </div>

          <button class="button button--primary" type="button">
            <img src="../assets/global/icons/shopping-bag-icon.svg" alt="" />
            Aggiungi al carrello
          </button>
        </section>
      `;
    })
    .join("");
}

/**
 * Abre il modal per scegliere in quale lista aggiungere il prodotto.
 */
function openWishlistModal(product) {
  wishlist.load();

  selectedProduct = product;

  const lists = wishlist.getLists();

  if (!wishlistModal || !wishlistModalLists) {
    return;
  }

  if (lists.length === 0) {
    alert("Prima crea una lista dei desideri.");
    return;
  }

  wishlistModalLists.innerHTML = lists
    .map((list) => {
      return `
        <button
          class="wishlist-modal__list-button"
          type="button"
          data-select-wishlist-list
          data-list-id="${list.id}"
        >
          ${list.name} (${list.products.length})
        </button>
      `;
    })
    .join("");

  wishlistModal.classList.add("is-open");
}

/**
 * Chiude il modal delle liste.
 */
function closeWishlistModal() {
  if (!wishlistModal) {
    return;
  }

  wishlistModal.classList.remove("is-open");
  selectedProduct = null;
}

/**
 * Gestisce il click su un cuore prodotto.
 *
 * Funziona anche per prodotti renderizzati dinamicamente,
 * perché usa event delegation sul document.
 */
function handleFavoriteClick(event) {
  const favoriteButton = event.target.closest("[data-add-to-wishlist]");

  if (!favoriteButton) {
    return;
  }

  event.preventDefault();

  const product = getProductFromButton(favoriteButton);

  openWishlistModal(product);
}

/**
 * Gestisce la selezione della lista dentro il modal.
 */
function handleModalListClick(event) {
  const listButton = event.target.closest("[data-select-wishlist-list]");

  if (!listButton || !selectedProduct) {
    return;
  }

  const listId = listButton.dataset.listId;

  wishlist.addProductToList(listId, selectedProduct);

  renderWishlistLists();
  closeWishlistModal();
}

/**
 * Inizializza tutta la logica delle liste dei desideri.
 */
function initWishlistUI() {
  wishlist.load();

  renderWishlistLists();

  if (createListButton) {
    createListButton.addEventListener("click", openCreateWishlistModal);
  }

  if (closeCreateWishlistModalButton) {
    closeCreateWishlistModalButton.addEventListener(
      "click",
      closeCreateWishlistModal,
    );
  }

  if (createWishlistForm) {
    createWishlistForm.addEventListener("submit", handleCreateWishlistSubmit);
  }

  document.addEventListener("click", handleFavoriteClick);

  if (wishlistModalLists) {
    wishlistModalLists.addEventListener("click", handleModalListClick);
  }

  if (wishlistModalClose) {
    wishlistModalClose.addEventListener("click", closeWishlistModal);
  }
}

initWishlistUI();
