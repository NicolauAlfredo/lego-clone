import { Favorite } from "../models/Favorite.js";
import { Cart } from "../models/Cart.js";
import { formatCurrency } from "../utils/currency.js";
import { updateCartCounters } from "./cart-add-product.js";

/**
 * Istanza del modello Favorite.
 *
 * Gestisce le liste dei desideri:
 * - creazione delle liste
 * - aggiunta/rimozione dei prodotti
 * - calcolo del totale per lista
 * - persistenza dei dati nel localStorage
 */
const favorite = new Favorite();

/**
 * Istanza del modello Cart.
 *
 * Viene usata in questo file solo per aggiungere
 * al carrello tutti i prodotti presenti in una lista.
 */
const cart = new Cart();

/**
 * Prodotto selezionato dall'utente tramite click sul cuore.
 *
 * Il valore viene salvato temporaneamente perché il prodotto
 * viene aggiunto o rimosso solo dopo che l'utente sceglie
 * una lista nel popover.
 */
let selectedProduct = null;

/**
 * Bottone cuore che ha aperto il popover.
 *
 * Serve per recuperare il popover inline collegato al prodotto
 * e per riaprirlo dopo la creazione di una nuova lista.
 */
let activeFavoriteButton = null;

/**
 * Contenitore presente nella pagina "Lista dei desideri".
 *
 * Se l'elemento non esiste, significa che siamo in un'altra pagina
 * e il riepilogo delle liste non deve essere renderizzato.
 */
const wishlistSummaryContainer = document.querySelector(
  "[data-wishlist-lists]",
);

/**
 * Icona cuore vuota.
 *
 * La classe viene sostituita dinamicamente in base al tipo di card:
 * - perfect-set-heart-icon
 * - wishlist-product__heart-icon
 * - cart-product__heart-icon
 */
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

/**
 * Icona cuore piena.
 *
 * Viene mostrata quando il prodotto è presente
 * in almeno una lista dei desideri.
 */
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
 *
 * @param {string} date - Data in formato ISO.
 * @returns {string} Data formattata per l'interfaccia.
 */
function formatDate(date) {
  return new Intl.DateTimeFormat("it-IT").format(new Date(date));
}

/**
 * Estrae i dati del prodotto dagli attributi data-* del bottone cuore.
 *
 * Questo permette di usare lo stesso handler per prodotti renderizzati
 * in homepage, nella pagina preferiti e nel carrello.
 *
 * @param {HTMLButtonElement} button - Bottone cuore cliccato.
 * @returns {Object} Dati essenziali del prodotto.
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
 * Elementi del modal usato per creare una nuova lista.
 *
 * Questi elementi possono non esistere in alcune pagine.
 * Per questo motivo ogni funzione controlla la loro presenza
 * prima di usarli.
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
 *
 * Dopo l'apertura, sposta il focus sull'input
 * per rendere più veloce l'inserimento del nome.
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
 *
 * Se il form esiste, viene anche resettato
 * per evitare che il nome precedente resti nell'input.
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
 * Gestisce la creazione di una nuova lista dei desideri.
 *
 * Flusso:
 * 1. legge il nome dal form
 * 2. crea la lista tramite il modello Favorite
 * 3. aggiorna il riepilogo delle liste
 * 4. aggiorna lo stato visivo dei cuori
 * 5. chiude il modal di creazione
 * 6. se un prodotto era già selezionato, aggiorna e riapre il popover
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

  favorite.createList(listName);
  favorite.load();

  renderWishlistLists();
  updateFavoriteButtonsState();
  closeCreateWishlistModal();

  if (selectedProduct && activeFavoriteButton) {
    const wrapper = activeFavoriteButton.closest(".favorite-popover-wrapper");
    const inlineModal = wrapper?.querySelector("[data-inline-wishlist-modal]");
    const inlineModalLists = wrapper?.querySelector(
      "[data-inline-wishlist-modal-lists]",
    );

    if (inlineModal && inlineModalLists) {
      renderWishlistPopoverLists(selectedProduct, inlineModalLists);
      inlineModal.classList.add("is-open");
    }
  }
}

/**
 * Aggiunge al carrello tutti i prodotti di una lista dei desideri.
 *
 * Se un prodotto è già presente nel carrello, il modello Cart
 * aumenta automaticamente la quantità invece di duplicarlo.
 */
function handleAddFavoriteListToCart(event) {
  const addListButton = event.target.closest("[data-add-list-to-cart]");

  if (!addListButton) {
    return;
  }

  event.preventDefault();

  const listId = addListButton.dataset.listId;

  favorite.load();
  cart.load();

  const list = favorite.getListById(listId);

  if (!list || list.products.length === 0) {
    return;
  }

  list.products.forEach((product) => {
    cart.addProduct({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
    });
  });

  cart.save();
  updateCartCounters();
}

/**
 * Renderizza il riepilogo delle liste nella pagina "Lista dei desideri".
 *
 * Ogni lista mostra:
 * - nome
 * - numero di prodotti
 * - data ultimo aggiornamento
 * - costo totale
 * - anteprima dei primi prodotti
 * - bottone per eliminare la lista
 * - bottone per aggiungere tutta la lista al carrello
 */
function renderWishlistLists() {
  favorite.load();

  const lists = favorite.getLists();

  if (!wishlistSummaryContainer) {
    return;
  }

  wishlistSummaryContainer.innerHTML = lists
    .map((list) => {
      const total = favorite.calculateListTotal(list.id);

      return `
        <section class="wishlist-summary">
          <div class="wishlist-summary__info">
            <a href="#" class="wishlist-summary__name">
              ${list.name} (${list.products.length})
            </a>

            <p>Ultimo aggiornamento: ${formatDate(list.updatedAt)}</p>

            <strong>Costo totale: ${formatCurrency(total)}</strong>

            <button
              class="button button_trash"
              type="button"
              aria-label="Elimina lista ${list.name}"
              data-delete-favorite-list
              data-list-id="${list.id}"
            >
              <img
                src="../assets/pages/favorites/icons/trash-icon.svg"
                alt=""
              />
            </button>
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

          <button
            class="button button--primary"
            type="button"
            data-add-list-to-cart
            data-list-id="${list.id}"
          >
            <img src="../assets/global/icons/shopping-bag-icon.svg" alt="" />
            Aggiungi al carrello
          </button>
        </section>
      `;
    })
    .join("");
}

/**
 * Apre il popover inline collegato al cuore cliccato.
 *
 * Ogni card prodotto contiene il proprio popover nascosto.
 * In questo modo il menu viene posizionato vicino al bottone
 * senza dover calcolare coordinate globali della pagina.
 */
function openWishlistModal(product, anchorButton) {
  const wrapper = anchorButton.closest(".favorite-popover-wrapper");

  if (!wrapper) {
    return;
  }

  const inlineModal = wrapper.querySelector("[data-inline-wishlist-modal]");
  const inlineModalLists = wrapper.querySelector(
    "[data-inline-wishlist-modal-lists]",
  );

  if (!inlineModal || !inlineModalLists) {
    return;
  }

  favorite.load();

  selectedProduct = product;
  activeFavoriteButton = anchorButton;

  closeAllWishlistPopovers();

  renderWishlistPopoverLists(product, inlineModalLists);

  inlineModal.classList.add("is-open");
}

/**
 * Elimina completamente una lista dei desideri.
 *
 * Dopo l'eliminazione aggiorna:
 * - il riepilogo delle liste
 * - lo stato dei cuori dei prodotti
 */
function handleDeleteFavoriteList(event) {
  const deleteButton = event.target.closest("[data-delete-favorite-list]");

  if (!deleteButton) {
    return;
  }

  event.preventDefault();

  const listId = deleteButton.dataset.listId;

  favorite.deleteList(listId);

  renderWishlistLists();
  updateFavoriteButtonsState();
}

/**
 * Chiude tutti i popover inline aperti.
 *
 * Serve per evitare che più menu restino aperti
 * contemporaneamente quando l'utente clicca su cuori diversi.
 */
function closeAllWishlistPopovers() {
  const openedPopovers = document.querySelectorAll(
    "[data-inline-wishlist-modal].is-open",
  );

  openedPopovers.forEach((popover) => {
    popover.classList.remove("is-open");
  });
}

/**
 * Renderizza le liste disponibili dentro il popover.
 *
 * Ogni lista mostra una checkbox visiva:
 * - selezionata se il prodotto è già presente nella lista
 * - vuota se il prodotto non è ancora presente
 *
 * Il bottone finale permette di creare una nuova lista
 * senza uscire dal flusso di aggiunta ai preferiti.
 */
function renderWishlistPopoverLists(product, targetContainer = null) {
  const lists = favorite.getLists();

  if (!targetContainer) {
    return;
  }

  targetContainer.innerHTML = `
    ${lists
      .map((list) => {
        const isChecked = favorite.hasProductInList(list.id, product.id);

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
 * Chiude il popover delle liste e pulisce lo stato temporaneo.
 */
function closeWishlistModal() {
  closeAllWishlistPopovers();
  selectedProduct = null;
  activeFavoriteButton = null;
}

/**
 * Gestisce il click su un bottone cuore.
 *
 * Usa event delegation sul document, quindi funziona anche
 * con card prodotto renderizzate dinamicamente dopo il caricamento.
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
 * Aggiorna lo stato visivo di tutti i bottoni cuore.
 *
 * Se un prodotto è presente in almeno una lista:
 * - aggiunge la classe is-favorite
 * - sostituisce l'icona vuota con quella piena
 *
 * Se non è presente in nessuna lista:
 * - rimuove la classe is-favorite
 * - ripristina l'icona vuota
 */
function updateFavoriteButtonsState() {
  favorite.load();

  const favoriteButtons = document.querySelectorAll("[data-add-to-wishlist]");

  favoriteButtons.forEach((button) => {
    const productId = button.dataset.productId;
    const isFavorite = favorite.hasProduct(productId);

    button.classList.toggle("is-favorite", isFavorite);

    const iconClass = button.classList.contains("perfect-set-favorite-button")
      ? "perfect-set-heart-icon"
      : button.classList.contains("cart-product__favorite")
        ? "cart-product__heart-icon"
        : "wishlist-product__heart-icon";

    const currentIcon = button.querySelector("svg");

    if (currentIcon) {
      currentIcon.outerHTML = isFavorite
        ? HEART_FILLED_ICON.replace("perfect-set-heart-icon", iconClass)
        : HEART_OUTLINE_ICON.replace("perfect-set-heart-icon", iconClass);
    }
  });
}

/**
 * Gestisce la scelta di una lista nel popover.
 *
 * Comportamento toggle:
 * - se il prodotto è già nella lista selezionata, viene rimosso
 * - se il prodotto non è nella lista selezionata, viene aggiunto
 *
 * Dopo ogni modifica aggiorna il riepilogo, il popover
 * e lo stato visivo dei cuori.
 */
function handleModalListClick(event) {
  const listButton = event.target.closest("[data-select-wishlist-list]");

  if (!listButton || !selectedProduct) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  const listId = listButton.dataset.listId;
  const productId = selectedProduct.id;
  const productAlreadyInList = favorite.hasProductInList(listId, productId);

  if (productAlreadyInList) {
    favorite.removeProductFromList(listId, productId);
  } else {
    favorite.addProductToList(listId, selectedProduct);
  }

  favorite.load();

  const currentListsContainer = listButton.closest(
    "[data-inline-wishlist-modal-lists]",
  );

  renderWishlistLists();
  renderWishlistPopoverLists(selectedProduct, currentListsContainer);
  updateFavoriteButtonsState();
}

/**
 * Inizializza tutta la logica delle liste dei desideri.
 *
 * La funzione è pensata per funzionare su più pagine:
 * - homepage
 * - pagina lista dei desideri
 * - pagina carrello
 *
 * Per questo motivo usa event delegation e controlli difensivi
 * sugli elementi che possono non esistere in tutte le pagine.
 */
function initWishlistUI() {
  favorite.load();

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
    const clickedInsidePopover = event.target.closest(
      "[data-inline-wishlist-modal]",
    );
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

  document.addEventListener(
    "favorites:products-rendered",
    updateFavoriteButtonsState,
  );

  document.addEventListener("click", handleDeleteFavoriteList);
  document.addEventListener("click", handleAddFavoriteListToCart);
  document.addEventListener("click", handleModalListClick);

  cart.load();
  updateCartCounters();
}

initWishlistUI();
