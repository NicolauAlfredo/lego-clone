import { Wishlist } from "../models/Wishlist.js";
import { formatCurrency } from "../utils/currency.js";

/**
 * Selettore globale del modello Wishlist.
 *
 * Gestisce:
 * - creazione delle liste
 * - aggiunta dei prodotti alle liste
 * - lettura/scrittura nel localStorage
 */
const wishlist = new Wishlist();

/**
 * Prodotto attualmente selezionato tramite click sul cuore.
 * Serve quando l'utente sceglie una lista nel popover.
 */
let selectedProduct = null;

/**
 * Bottone cuore che ha aperto il popover.
 * Serve per riposizionare il popover dopo la creazione di una nuova lista.
 */
let activeFavoriteButton = null;

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

const HEART_OUTLINE_ICON = `
<svg
  class="perfect-set-heart-icon"
  viewBox="0 0 40 40"
  fill="currentColor"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path d="m18.063 34.117-.125-.188L7 23.804a9.458 9.458 0 0 1-3-6.938v-.187c0-4.375 3.125-8.188 7.438-9 2.437-.5 4.937.062 7 1.5.562.375 1.062.875 1.562 1.375.25-.25.5-.563.813-.813l.75-.562c2-1.438 4.5-2 6.937-1.5a9.167 9.167 0 0 1 7.5 9v.188c0 2.624-1.125 5.124-3.063 6.937L22 33.929l-.125.188c-.5.437-1.188.75-1.875.75-.75 0-1.375-.313-1.938-.75Zm.875-20.25c-.063 0-.063 0-.063-.063l-1.125-1.25c-1.438-1.625-3.625-2.313-5.75-1.938a6.158 6.158 0 0 0-5 6.063v.188c0 1.812.688 3.5 2 4.687l11 10.188 10.938-10.188A6.289 6.289 0 0 0 33 16.866v-.187c0-2.937-2.125-5.5-5.063-6.062-2.125-.376-4.312.312-5.75 1.937l-1.125 1.25c0 .063 0 .063-.062.125-.25.25-.625.438-1 .438-.438 0-.813-.188-1.063-.438v-.063Z"/>
</svg>
`;

const HEART_FILLED_ICON = `
<svg
  class="perfect-set-heart-icon"
  viewBox="0 0 40 40"
  fill="currentColor"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path d="M6.938 23.633C5.063 21.883 4 19.383 4 16.758v-.313c0-4.375 3.125-8.125 7.438-8.813 2.874-.5 5.75.438 7.812 2.438l.75.75.75-.75c2-2 4.938-2.938 7.75-2.438 4.313.688 7.5 4.438 7.5 8.813v.313a9.455 9.455 0 0 1-3 6.875L21.687 34.194c-.437.438-1.062.625-1.687.625-.688 0-1.313-.188-1.75-.625L6.937 23.632Z"/>
</svg>
`;

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
 * Elementi del modal dedicato alla creazione
 * di una nuova lista dei desideri.
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
    if (wishlistNameInput) {
      wishlistNameInput.focus();
    }
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

  if (createWishlistForm) {
    createWishlistForm.reset();
  }
}

/**
 * Gestisce l'invio del form di creazione lista.
 *
 * Dopo aver creato la lista:
 * - salva i dati nel localStorage
 * - aggiorna il riepilogo nella pagina wishlist
 * - aggiorna lo stato dei cuori
 * - chiude il modal di creazione
 * - riapre/aggiorna il popover se un prodotto era selezionato
 */
function handleCreateWishlistSubmit(event) {
  event.preventDefault();

  if (!createWishlistForm) {
    return;
  }

  const formData = new FormData(createWishlistForm);
  const listName = formData.get("wishlistName")?.trim();

  if (!listName) {
    return;
  }

  wishlist.createList(listName);
  wishlist.load();

  renderWishlistLists();
  updateFavoriteButtonsState();
  closeCreateWishlistModal();

  if (selectedProduct && activeFavoriteButton) {
    renderWishlistPopoverLists(selectedProduct);
    wishlistModal.classList.add("is-open");
    positionWishlistPopover(activeFavoriteButton);
  }
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
function openWishlistModal(product, anchorButton) {
  if (!wishlistModal || !wishlistModalLists) {
    return;
  }

  wishlist.load();

  selectedProduct = product;
  activeFavoriteButton = anchorButton;

  renderWishlistPopoverLists(product);

  wishlistModal.classList.add("is-open");

  positionWishlistPopover(anchorButton);
}

/**
 * Renderizza dentro il popover tutte le liste disponibili.
 *
 * Per ogni lista mostra:
 * - checkbox visiva
 * - nome della lista
 * - numero di prodotti presenti
 *
 * Alla fine aggiunge il bottone per creare una nuova lista.
 */
function renderWishlistPopoverLists(product) {
  const lists = wishlist.getLists();

  if (!wishlistModalLists) {
    return;
  }

  wishlistModalLists.innerHTML = `
    ${lists
      .map((list) => {
        const isChecked = wishlist.hasProductInList(list.id, product.id);

        return `
          <button
            class="wishlist-modal__list-button"
            type="button"
            data-select-wishlist-list
            data-list-id="${list.id}"
          >
            <span class="wishlist-modal__checkbox ${isChecked ? "is-checked" : ""}"></span>
            <span>${list.name} (${list.products.length})</span>
          </button>
        `;
      })
      .join("")}

    <button
      class="wishlist-modal__create-button"
      type="button"
      data-create-wishlist-list
    >
      <img src="../assets/pages/favorites/icons/control-plus-solid-icon.svg" alt="">
      Crea una nuova lista
    </button>
  `;
}

/**
 * Posiziona il popover vicino al bottone cuore cliccato.
 *
 * Di default prova ad aprirlo sopra il bottone.
 * Se non c'è spazio sufficiente, lo apre sotto.
 * Inoltre impedisce al popover di uscire lateralmente dallo schermo.
 */
function positionWishlistPopover(anchorButton) {
  const buttonRect = anchorButton.getBoundingClientRect();
  const modalRect = wishlistModal.getBoundingClientRect();

  const spacing = 8;

  let top = window.scrollY + buttonRect.top - modalRect.height - spacing;
  let left =
    window.scrollX +
    buttonRect.left +
    buttonRect.width / 2 -
    modalRect.width / 2;

  const minLeft = 8;
  const maxLeft = window.scrollX + window.innerWidth - modalRect.width - 8;

  if (left < minLeft) {
    left = minLeft;
  }

  if (left > maxLeft) {
    left = maxLeft;
  }

  if (top < window.scrollY + 8) {
    top = window.scrollY + buttonRect.bottom + spacing;
  }

  wishlistModal.style.top = `${top}px`;
  wishlistModal.style.left = `${left}px`;
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
  event.stopPropagation();

  const product = getProductFromButton(favoriteButton);

  openWishlistModal(product, favoriteButton);
}

/**
 * Aggiorna il colore dei cuori dei prodotti già presenti
 * in almeno una lista dei desideri.
 */
function updateFavoriteButtonsState() {
  wishlist.load();

  const favoriteButtons = document.querySelectorAll("[data-add-to-wishlist]");

  favoriteButtons.forEach((button) => {
    const productId = button.dataset.productId;

    const isFavorite = wishlist.hasProduct(productId);

    button.classList.toggle("is-favorite", isFavorite);

    const iconClass = button.classList.contains("perfect-set-favorite-button")
      ? "perfect-set-heart-icon"
      : "wishlist-product__heart-icon";

    button.innerHTML = isFavorite
      ? HEART_FILLED_ICON.replace("perfect-set-heart-icon", iconClass)
      : HEART_OUTLINE_ICON.replace("perfect-set-heart-icon", iconClass);
  });
}

/**
 * Gestisce la scelta di una lista nel popover.
 *
 * Quando l'utente clicca su una lista:
 * - aggiunge il prodotto selezionato a quella lista
 * - aggiorna il localStorage
 * - aggiorna il riepilogo delle liste
 * - aggiorna il cuore del prodotto
 * - chiude il popover
 */

function handleModalListClick(event) {
  const listButton = event.target.closest("[data-select-wishlist-list]");

  if (!listButton || !selectedProduct) {
    return;
  }

  const listId = listButton.dataset.listId;

  wishlist.addProductToList(listId, selectedProduct);

  renderWishlistLists();
  updateFavoriteButtonsState();
  closeWishlistModal();
}

/**
 * Inizializza tutta la logica delle liste dei desideri.
 */
function initWishlistUI() {
  wishlist.load();

  renderWishlistLists();
  updateFavoriteButtonsState();

  document.addEventListener("click", handleFavoriteClick);

  document.addEventListener("click", (event) => {
    const createButton = event.target.closest("[data-create-wishlist-list]");

    if (!createButton) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    openCreateWishlistModal();
  });

  document.addEventListener("click", (event) => {
    const clickedInsidePopover = event.target.closest("[data-wishlist-modal]");
    const clickedFavoriteButton = event.target.closest(
      "[data-add-to-wishlist]",
    );
    const clickedInsideCreateModal = event.target.closest(
      "[data-create-wishlist-modal]",
    );

    if (
      !clickedInsidePopover &&
      !clickedFavoriteButton &&
      !clickedInsideCreateModal
    ) {
      closeWishlistModal();
    }
  });

  if (closeCreateWishlistModalButton) {
    closeCreateWishlistModalButton.addEventListener(
      "click",
      closeCreateWishlistModal,
    );
  }

  if (createWishlistForm) {
    createWishlistForm.addEventListener("submit", handleCreateWishlistSubmit);
  }

  if (wishlistModalLists) {
    wishlistModalLists.addEventListener("click", handleModalListClick);
  }

  if (wishlistModalClose) {
    wishlistModalClose.addEventListener("click", closeWishlistModal);
  }

  document.addEventListener(
    "wishlist:products-rendered",
    updateFavoriteButtonsState,
  );
}

initWishlistUI();
