// Seleziona il contenitore principale dell'accordion promozionale
const promoAccordion = document.querySelector("[data-promo-accordion]");

// Seleziona il bottone che apre e chiude l'accordion
const promoToggle = document.querySelector("[data-promo-toggle]");

// Seleziona l'icona della freccia dell'accordion
const promoArrow = document.querySelector(".order-summary__promo-arrow");

/**
 * Gestisce l'apertura e la chiusura dell'accordion
 * del codice promozionale.
 */
function togglePromoAccordion() {
  // Interrompe l'esecuzione se uno degli elementi non esiste
  if (!promoAccordion || !promoToggle || !promoArrow) {
    return;
  }

  // Aggiunge o rimuove la classe che chiude l'accordion
  const isClosed = promoAccordion.classList.toggle("is-closed");

  // Aggiorna l'attributo aria-expanded
  // per migliorare l'accessibilità
  promoToggle.setAttribute("aria-expanded", String(!isClosed));

  // Cambia dinamicamente l'icona della freccia
  // in base allo stato dell'accordion
  promoArrow.src = isClosed
    ? "../assets/pages/cart/icons/chevron-down-solid-icon.svg"
    : "../assets/pages/cart/icons/chevron-up-solid.svg";
}

// Aggiunge il listener del click
// solo se gli elementi esistono nel DOM
if (promoAccordion && promoToggle) {
  promoToggle.addEventListener("click", togglePromoAccordion);
}
