// Seleziona il contenitore principale dell'accordion promozionale
const promoAccordion = document.querySelector("[data-promo-accordion]");

// Seleziona il bottone che apre e chiude l'accordion
const promoToggle = document.querySelector("[data-promo-toggle]");

// Seleziona l'icona della freccia dell'accordion
const promoArrow = document.querySelector(".order-summary__promo-arrow");

promoToggle.addEventListener("click", () => {
  const willBeClosed = !promoAccordion.classList.contains("is-closed");
  promoAccordion.classList.toggle("is-closed");
  promoToggle.setAttribute("aria-expanded", !willBeClosed);
  promoArrow.src = willBeClosed
    ? "../assets/pages/cart/icons/chevron-down-solid-icon.svg"
    : "../assets/pages/cart/icons/chevron-up-solid-icon.svg";
});
