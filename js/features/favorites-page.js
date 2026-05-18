// Importa i prodotti già usati nella sezione "Trova il set perfetto" della homepage
import { perfectSetProducts } from "../data/perfect-set-products.js";

// Importa la funzione utility per formattare il prezzo in euro
import { formatCurrency } from "../utils/currency.js";

// Elemento in cui verranno inserite dinamicamente le card dei prodotti
const carousel = document.querySelector(".wishlist-recommended__carousel");

// Contenitore scrollabile orizzontalmente
const scrollContainer = document.querySelector(".wishlist-recommended__scroll");

// Pulsanti di navigazione del carosello
const prevButton = document.querySelector(
  ".wishlist-recommended__chevron--prev",
);
const nextButton = document.querySelector(
  ".wishlist-recommended__chevron--next",
);

// Numero massimo di prodotti consigliati da mostrare nella pagina
const PRODUCTS_TO_RENDER = 8;

// Piccola tolleranza per evitare problemi di arrotondamento dello scroll
const SCROLL_TOLERANCE = 8;

/**
 * Recupera tutti i prodotti presenti nelle varie categorie.
 *
 * perfectSetProducts è un oggetto diviso per categorie.
 * Object.values() prende gli array di ogni categoria.
 * flat() li unisce in un unico array.
 */
function getAllProducts() {
  return Object.values(perfectSetProducts).flat();
}

/**
 * Rimuove i prodotti duplicati.
 *
 * Alcuni prodotti possono esistere in più categorie, per esempio
 * "Bouquet di girasoli". Usiamo il nome come chiave per evitare
 * di mostrarli due volte nei consigliati.
 */
function removeDuplicatedProducts(products) {
  const productsMap = new Map();

  products.forEach((product) => {
    if (!productsMap.has(product.name)) {
      productsMap.set(product.name, product);
    }
  });

  return Array.from(productsMap.values());
}

/**
 * Mescola l'array dei prodotti.
 *
 * Crea prima una copia dell'array originale per non modificare
 * direttamente i dati importati da perfectSetProducts.
 */
function shuffleProducts(products) {
  return [...products].sort(() => Math.random() - 0.5);
}

/**
 * Prepara la lista finale dei prodotti consigliati.
 *
 * Logica:
 * 1. prende tutti i prodotti disponibili
 * 2. rimuove eventuali duplicati
 * 3. li mescola in ordine casuale
 * 4. restituisce solo il numero massimo di prodotti da renderizzare
 */
function getRandomRecommendedProducts() {
  const allProducts = getAllProducts();
  const uniqueProducts = removeDuplicatedProducts(allProducts);
  const shuffledProducts = shuffleProducts(uniqueProducts);

  return shuffledProducts.slice(0, PRODUCTS_TO_RENDER);
}

/**
 * Crea il markup della valutazione del prodotto.
 *
 * Se il prodotto non ha rating, non viene renderizzato nulla.
 */
function createRatingMarkup(rating) {
  if (!rating) {
    return "";
  }

  return `
    <span>
      <svg class="wishlist-product__icon wishlist-product__icon--star" viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="m21.763 5.111 4.062 8.313 8.938 1.312c.75.125 1.375.625 1.625 1.375.25.688.062 1.5-.5 2l-6.5 6.438 1.562 9.125c.125.75-.187 1.5-.812 1.937-.625.5-1.438.5-2.125.188l-8-4.313L11.95 35.8c-.625.312-1.437.312-2.062-.188a1.963 1.963 0 0 1-.813-1.937l1.5-9.125-6.5-6.438c-.5-.5-.687-1.312-.5-2 .25-.75.875-1.25 1.625-1.375l9-1.312 4-8.313c.313-.687 1-1.125 1.813-1.125.75 0 1.437.438 1.75 1.125Z"/>
      </svg>
      ${rating}
    </span>
  `;
}

/**
 * Crea il badge "Novità".
 *
 * Il badge viene mostrato solo se il prodotto ha isNew uguale a true.
 */
function createBadgeMarkup(product) {
  if (!product.isNew) {
    return "";
  }

  return `
    <div class="wishlist-product__badge">
      <span>Novità</span>
    </div>
  `;
}

/**
 * Crea il markup completo di una card prodotto.
 *
 * Ogni card contiene:
 * - badge Novità
 * - immagine prodotto
 * - età consigliata
 * - numero di pezzi
 * - rating, se presente
 * - nome prodotto
 * - prezzo formattato
 * - pulsante carrello
 * - pulsante preferiti
 */
function createProductCard(product) {
  return `
    <article class="wishlist-product">
      ${createBadgeMarkup(product)}

      <a href="#" class="wishlist-product__image-link">
        <img
          class="wishlist-product__image"
          src="${product.image}"
          alt="${product.alt}"
        />
      </a>

      <div class="wishlist-product__attributes">
        <span>
          <img src="../assets/global/icons/birthday-cake-icon.svg" alt="" />
          ${product.age}
        </span>

        <span>
          <img src="../assets/global/icons/brick-one-icon.svg" alt="" />
          ${product.pieces}
        </span>

        ${createRatingMarkup(product.rating)}
      </div>

      <h3 class="wishlist-product__name">
        <a href="#">${product.name}</a>
      </h3>

      <strong class="wishlist-product__price">
        ${formatCurrency(product.price)}
      </strong>

     <div class="wishlist-product__actions">
        <button
          class="wishlist-product__cart-button"
          type="button"
          data-add-to-cart
          data-product-id="${product.id}"
          data-product-name="${product.name}"
          data-product-price="${product.price}"
          data-product-image="${product.image}"
        >
        <img src="../assets/global/icons/shopping-bag-icon.svg" alt="" />
        Aggiungi al carrello
      </button>

      <button
        class="wishlist-product__favorite-button"
        type="button"
        aria-label="Aggiungi ${product.name} ai preferiti"
        data-add-to-wishlist
        data-product-id="${product.id}"
        data-product-name="${product.name}"
        data-product-price="${product.price}"
        data-product-image="${product.image}"
      >
      
      <svg viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="m18.063 34.117-.125-.188L7 23.804a9.458 9.458 0 0 1-3-6.938v-.187c0-4.375 3.125-8.188 7.438-9 2.437-.5 4.937.062 7 1.5.562.375 1.062.875 1.562 1.375.25-.25.5-.563.813-.813l.75-.562c2-1.438 4.5-2 6.937-1.5a9.167 9.167 0 0 1 7.5 9v.188c0 2.624-1.125 5.124-3.063 6.937L22 33.929l-.125.188c-.5.437-1.188.75-1.875.75-.75 0-1.375-.313-1.938-.75Zm.875-20.25c-.063 0-.063 0-.063-.063l-1.125-1.25c-1.438-1.625-3.625-2.313-5.75-1.938a6.158 6.158 0 0 0-5 6.063v.188c0 1.812.688 3.5 2 4.687l11 10.188 10.938-10.188A6.289 6.289 0 0 0 33 16.866v-.187c0-2.937-2.125-5.5-5.063-6.062-2.125-.376-4.312.312-5.75 1.937l-1.125 1.25c0 .063 0 .063-.062.125-.25.25-.625.438-1 .438-.438 0-.813-.188-1.063-.438v-.063Z"/></svg>
      </button>
    </div>
  </article>
  `;
}

/**
 * Calcola la distanza massima di scroll orizzontale.
 */
function getMaxScrollLeft() {
  return scrollContainer.scrollWidth - scrollContainer.clientWidth;
}

/**
 * Calcola quanto deve scorrere il carosello ad ogni click.
 *
 * Usa la larghezza della prima card più il gap tra le card.
 * Se non trova nessuna card, usa 300px come valore di fallback.
 */
function getScrollAmount() {
  const card = carousel.querySelector(".wishlist-product");

  if (!card) {
    return 300;
  }

  const carouselStyles = window.getComputedStyle(carousel);
  const gap = parseFloat(carouselStyles.columnGap || carouselStyles.gap) || 0;

  return card.offsetWidth + gap;
}

/**
 * Aggiorna lo stato dei pulsanti prev/next.
 *
 * Disabilita il pulsante sinistro se siamo all'inizio.
 * Disabilita il pulsante destro se siamo alla fine.
 */
function updateButtonsState() {
  const currentScroll = scrollContainer.scrollLeft;
  const maxScrollLeft = getMaxScrollLeft();

  const isAtStart = currentScroll <= SCROLL_TOLERANCE;
  const isAtEnd = currentScroll >= maxScrollLeft - SCROLL_TOLERANCE;

  prevButton.disabled = isAtStart;
  nextButton.disabled = isAtEnd;

  prevButton.classList.toggle("is-disabled", isAtStart);
  nextButton.classList.toggle("is-disabled", isAtEnd);
}

/**
 * Gestisce il click sui pulsanti del carosello.
 *
 * direction può essere:
 * - "next": scorre verso destra
 * - "prev": scorre verso sinistra
 */
function handleChevronClick(direction) {
  const scrollAmount = getScrollAmount();
  const maxScrollLeft = getMaxScrollLeft();

  const targetScroll =
    direction === "next"
      ? Math.min(scrollContainer.scrollLeft + scrollAmount, maxScrollLeft)
      : Math.max(scrollContainer.scrollLeft - scrollAmount, 0);

  scrollContainer.scrollTo({
    left: targetScroll,
    behavior: "smooth",
  });
}

/**
 * Renderizza i prodotti consigliati nel carosello.
 *
 * Dopo il render:
 * - riporta lo scroll all'inizio
 * - aggiorna lo stato dei pulsanti
 */
function renderRecommendedProducts() {
  const products = getRandomRecommendedProducts();

  carousel.innerHTML = products.map(createProductCard).join("");

  requestAnimationFrame(() => {
    scrollContainer.scrollLeft = 0;
    updateButtonsState();
  });

  document.dispatchEvent(new CustomEvent("favorites:products-rendered"));
}

/**
 * Inizializza la sezione "Consigliati per te".
 *
 * Se uno degli elementi principali non esiste nella pagina,
 * la funzione si interrompe per evitare errori JavaScript.
 */
function initWishlistRecommendedProducts() {
  if (!carousel || !scrollContainer || !prevButton || !nextButton) {
    return;
  }

  renderRecommendedProducts();

  prevButton.addEventListener("click", () => {
    handleChevronClick("prev");
  });

  nextButton.addEventListener("click", () => {
    handleChevronClick("next");
  });

  scrollContainer.addEventListener("scroll", updateButtonsState);
  window.addEventListener("resize", updateButtonsState);
}

// Avvia la logica della sezione quando il modulo viene caricato
initWishlistRecommendedProducts();
