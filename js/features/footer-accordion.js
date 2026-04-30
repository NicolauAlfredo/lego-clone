// Seleziona tutti gli elementi <details> utilizzati come accordion nel footer
const footerAccordions = document.querySelectorAll(".footer-accordion");

// Definisce il breakpoint responsive (tablet/mobile)
const footerBreakpoint = window.matchMedia("(max-width: 1024px)");

/**
 * Gestisce lo stato degli accordion nel footer in base alla dimensione dello schermo.
 *
 * Logica:
 * - Su schermi piccoli (<= 1024px): gli accordion devono essere chiusi
 *   -> comportamento tipico mobile (collassabile)
 *
 * - Su schermi grandi (> 1024px): gli accordion devono essere aperti
 *   -> comportamento desktop (contenuto sempre visibile)
 */
function updateFooterAccordions() {
  footerAccordions.forEach((accordion) => {
    if (footerBreakpoint.matches) {
      // Mobile / Tablet -> chiude tutti gli accordion
      accordion.removeAttribute("open");
    } else {
      // Desktop -> apre tutti gli accordion
      accordion.setAttribute("open", "");
    }
  });
}

// Esegue la funzione al caricamento iniziale della pagina
updateFooterAccordions();

// Ascolta i cambiamenti del viewport (resize) e aggiorna lo stato dinamicamente
footerBreakpoint.addEventListener("change", updateFooterAccordions);
