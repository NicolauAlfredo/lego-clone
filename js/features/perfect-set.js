// Importa i dati dei prodotti della sezione "Perfect Set"
import { perfectSetProducts } from "../data/perfect-set-products.js";

// Importa la funzione per formattare il prezzo in valuta
import { formatCurrency } from "../utils/currency.js";

// Seleziona il carosello dove verranno renderizzate le card dei prodotti
const carousel = document.querySelector(".perfect-set-carousel");

// Seleziona il contenitore scrollabile del carosello
const scrollContainer = document.querySelector(".perfect-set-scroll");

// Seleziona tutti i link/tabs di navigazione delle categorie
const navLinks = document.querySelectorAll(".perfect-set-nav-link");

// Seleziona gli elementi principali del carosello "Perfect Set"
const prevButton = document.querySelector(".perfect-set-chevron--prev"); // freccia sinistra
const nextButton = document.querySelector(".perfect-set-chevron--next"); // freccia destra

// Tolleranza per evitare problemi di arrotondamento nello scroll (pixel)
const SCROLL_TOLERANCE = 8;

/**
 * Crea il markup HTML della valutazione del prodotto.
 *
 * Se il prodotto non ha una valutazione disponibile,
 * non viene renderizzato nulla.
 */
function createRatingMarkup(rating) {
  if (!rating) {
    return "";
  }

  return `
    <span>
      <svg class="perfect-set-attributes-icons star-icon" viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="m21.763 5.111 4.062 8.313 8.938 1.312c.75.125 1.375.625 1.625 1.375.25.688.062 1.5-.5 2l-6.5 6.438 1.562 9.125c.125.75-.187 1.5-.812 1.937-.625.5-1.438.5-2.125.188l-8-4.313L11.95 35.8c-.625.312-1.437.312-2.062-.188a1.963 1.963 0 0 1-.813-1.937l1.5-9.125-6.5-6.438c-.5-.5-.687-1.312-.5-2 .25-.75.875-1.25 1.625-1.375l9-1.312 4-8.313c.313-.687 1-1.125 1.813-1.125.75 0 1.437.438 1.75 1.125Z"/></svg>
      ${rating}
    </span>
  `;
}

/**
 * Crea il badge "Novità" se il prodotto è nuovo.
 *
 * Se isNew è false, il badge non viene renderizzato.
 */
function createBadgeMarkup(isNew) {
  if (!isNew) {
    return "";
  }

  return `
    <div class="perfect-set-badge">
      <span>Novità</span>
    </div>
  `;
}

/**
 * Crea il markup HTML completo di una card prodotto.
 *
 * Ogni card contiene:
 * - badge "Novità"
 * - immagine prodotto
 * - attributi principali (età, numero pezzi, rating)
 * - nome prodotto
 * - prezzo formattato
 * - pulsanti carrello e preferiti
 */
function createProductCard(product) {
  return `
    <article class="perfect-set-article">
      ${createBadgeMarkup(product.isNew)}

      <div class="perfect-set-card-image">
        <a href="#" class="perfect-set-link-product">
          <img
            class="perfect-set-card-image-product"
            src="${product.image}"
            alt="${product.alt}"
          />
        </a>
      </div>

      <div class="perfect-set-attributes">
        <span>
          <span class="perfect-set-attributes-icons">
            <img src="./assets/global/icons/birthday-cake-icon.svg" alt="" />
          </span>
          ${product.age}
        </span>

        <span>
          <span class="perfect-set-attributes-icons">
            <img src="./assets/global/icons/brick-one-icon.svg" alt="" />
          </span>
          ${product.pieces}
        </span>

        ${createRatingMarkup(product.rating)}
      </div>

      <h3 class="perfect-set-product-name">
        <a href="#" class="perfect-set-product-name-text">
          ${product.name}
        </a>
      </h3>

      <div class="perfect-set-price">
        <span>${formatCurrency(product.price)}</span>
      </div>

      <div class="perfect-set-carrello-container">
        <div class="perfect-set-carrello-btn">
          <button
            class="perfect-set-carrello-aggiungi-al-carrello"
            type="button"
            data-add-to-cart
            data-product-id="${product.id}"
            data-product-name="${product.name}"
            data-product-price="${product.price}"
            data-product-image="${product.image}"
          >
            <img
              src="./assets/global/icons/shopping-bag-icon.svg"
              alt=""
              class="carrello-bag-icon"
            />
            Aggiungi al carrello
          </button>
        </div>

        <button
          class="perfect-set-carrello-btn-responsive"
          type="button"
          aria-label="Aggiungi ${product.name} al carrello"
          data-add-to-cart
          data-product-id="${product.id}"
          data-product-name="${product.name}"
          data-product-price="${product.price}"
          data-product-image="${product.image}"
        >
          <img
            src="./assets/global/icons/shopping-bag-icon.svg"
            alt=""
            class="carrello-bag-icon"
          />
        </button>

        <button
          class="perfect-set-favorite-button"
          type="button"
          aria-label="Aggiungi ${product.name} ai preferiti"
        >
          <img src="./assets/global/icons/heart-icon.svg" alt="" />
        </button>
      </div>
    </article>
  `;
}

/**
 * Calcola il massimo valore di scroll orizzontale possibile
 * (larghezza totale contenuto - larghezza visibile)
 */
const getMaxScrollLeft = () => {
  return scrollContainer.scrollWidth - scrollContainer.clientWidth;
};

/**
 * Determina quanto scrollare ad ogni click:
 * - larghezza di una card + gap del layout
 * - fallback a 300px se non trova card
 */
const getScrollAmount = () => {
  const card = carousel.querySelector(".perfect-set-article");

  if (!card) return 300;

  const carouselStyles = window.getComputedStyle(carousel);
  const gap = parseFloat(carouselStyles.columnGap || carouselStyles.gap) || 0;

  return card.offsetWidth + gap;
};

/**
 * Resetta lo stato visivo delle frecce (rimuove classi temporanee)
 */
const resetVisualState = () => {
  prevButton.classList.remove(
    "perfect-set-chevron--plain",
    "perfect-set-chevron--clicked",
  );

  nextButton.classList.remove(
    "perfect-set-chevron--plain",
    "perfect-set-chevron--clicked",
  );
};

/**
 * Aggiorna lo stato delle frecce:
 * - disabilita se siamo all'inizio o alla fine
 * - gestisce classi CSS per stato attivo/disattivo
 */
const updateButtonsState = () => {
  const currentScroll = scrollContainer.scrollLeft;
  const maxScrollLeft = getMaxScrollLeft();

  const isAtStart = currentScroll <= SCROLL_TOLERANCE;
  const isAtEnd = currentScroll >= maxScrollLeft - SCROLL_TOLERANCE;

  prevButton.classList.remove("perfect-set-chevron--disabled");
  nextButton.classList.remove("perfect-set-chevron--disabled");

  if (isAtStart) {
    prevButton.classList.add("perfect-set-chevron--disabled");
    prevButton.classList.remove("perfect-set-chevron--plain");
    nextButton.classList.remove("perfect-set-chevron--plain");
  }

  if (isAtEnd) {
    nextButton.classList.add("perfect-set-chevron--disabled");
    nextButton.classList.remove("perfect-set-chevron--plain");
    prevButton.classList.remove("perfect-set-chevron--plain");
  }
};

/**
 * Gestisce il click sulle frecce del carosello
 *
 * Logica:
 * - Calcola la nuova posizione di scroll (prev/next)
 * - Applica animazione smooth
 * - Aggiorna stato visivo delle frecce
 */
const handleChevronClick = (direction) => {
  const isNext = direction === "next";
  const scrollAmount = getScrollAmount();
  const maxScrollLeft = getMaxScrollLeft();

  const targetScroll = isNext
    ? Math.min(scrollContainer.scrollLeft + scrollAmount, maxScrollLeft)
    : Math.max(scrollContainer.scrollLeft - scrollAmount, 0);

  resetVisualState();

  // Aggiorna lo stato visivo (feedback utente)
  if (isNext) {
    prevButton.classList.add("perfect-set-chevron--plain");
    nextButton.classList.add("perfect-set-chevron--clicked");
  } else {
    nextButton.classList.add("perfect-set-chevron--plain");
    prevButton.classList.add("perfect-set-chevron--clicked");
  }

  // Scroll fluido verso la nuova posizione
  scrollContainer.scrollTo({
    left: targetScroll,
    behavior: "smooth",
  });

  // Dopo l’animazione, resetta lo stato e aggiorna i bottoni
  setTimeout(() => {
    prevButton.classList.remove("perfect-set-chevron--clicked");
    nextButton.classList.remove("perfect-set-chevron--clicked");

    updateButtonsState();
  }, 500);
};

/**
 * Renderizza i prodotti della categoria selezionata.
 *
 * Logica:
 * - Recupera i prodotti dalla categoria scelta
 * - Aggiorna il contenuto HTML del carosello
 * - Riporta lo scroll all'inizio
 * - Aggiorna lo stato delle frecce dopo il render
 */
function renderProducts(category) {
  const products = perfectSetProducts[category];

  if (!products || !carousel) {
    return;
  }

  // Aggiunge una classe temporanea per gestire l’animazione di cambio categoria
  carousel.classList.add("is-changing");

  // Genera tutte le card prodotto e le inserisce nel carosello
  carousel.innerHTML = products.map(createProductCard).join("");

  // Dopo il cambio categoria, riporta il carosello alla posizione iniziale
  if (scrollContainer) {
    scrollContainer.scrollLeft = 0;
  }

  // Rimuove la classe temporanea dopo il re-render del browser
  requestAnimationFrame(() => {
    carousel.classList.remove("is-changing");

    // Dopo il render dei prodotti, aggiorna lo stato delle frecce
    if (scrollContainer && prevButton && nextButton) {
      resetVisualState();
      updateButtonsState();
    }
  });
}

/**
 * Aggiorna visivamente il tab attivo.
 *
 * Rimuove la classe active da tutti i link
 * e la aggiunge solo al link selezionato.
 */
function setActiveTab(activeLink) {
  navLinks.forEach((link) => {
    link.classList.remove("perfect-set-nav-link--active");
  });

  activeLink.classList.add("perfect-set-nav-link--active");
}

/**
 * Gestisce il click sui tab delle categorie.
 *
 * Evita il comportamento default del link,
 * legge la categoria dal dataset e aggiorna
 * sia il tab attivo sia i prodotti mostrati.
 */
function handleTabClick(event) {
  event.preventDefault();

  const clickedLink = event.currentTarget;
  const category = clickedLink.dataset.category;

  setActiveTab(clickedLink);
  renderProducts(category);
}

/**
 * Inizializza le tabs della sezione "Perfect Set".
 */
function initPerfectSetTabs() {
  // Associa l’evento click a ogni tab di categoria
  navLinks.forEach((link) => {
    link.addEventListener("click", handleTabClick);
  });

  // Render iniziale: mostra i prodotti della categoria "inEvidenza"
  renderProducts("inEvidenza");
}

/**
 * Inizializza il carosello della sezione "Perfect Set".
 */
function initPerfectSetCarousel() {
  // Esegue il codice solo se tutti gli elementi necessari sono presenti nel DOM
  if (!scrollContainer || !carousel || !prevButton || !nextButton) {
    return;
  }

  // Event listener click freccia sinistra
  prevButton.addEventListener("click", (event) => {
    event.stopPropagation(); // evita effetti collaterali su click globali
    handleChevronClick("prev");
  });

  // Event listener click freccia destra
  nextButton.addEventListener("click", (event) => {
    event.stopPropagation();
    handleChevronClick("next");
  });

  // Aggiorna stato bottoni durante lo scroll manuale (drag/trackpad)
  scrollContainer.addEventListener("scroll", updateButtonsState);

  // Click globale: resetta eventuali stati visivi
  document.addEventListener("click", () => {
    resetVisualState();
    updateButtonsState();
  });

  // Inizializza lo stato dei bottoni al caricamento
  updateButtonsState();
}

/**
 * Inizializza tutta la sezione "Perfect Set".
 */
function initPerfectSet() {
  if (!carousel || !scrollContainer) {
    return;
  }

  initPerfectSetTabs();
  initPerfectSetCarousel();
}

initPerfectSet();
