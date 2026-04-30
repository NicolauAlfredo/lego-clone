// Seleziona gli elementi principali del carosello "Perfect Set"
const scrollContainer = document.querySelector(".perfect-set-scroll"); // contenitore scrollabile (overflow-x)
const carousel = document.querySelector(".perfect-set-carousel"); // wrapper delle card
const prevButton = document.querySelector(".perfect-set-chevron--prev"); // freccia sinistra
const nextButton = document.querySelector(".perfect-set-chevron--next"); // freccia destra

// Esegue il codice solo se tutti gli elementi necessari sono presenti nel DOM
if (scrollContainer && carousel && prevButton && nextButton) {
  // Tolleranza per evitare problemi di arrotondamento nello scroll (pixel)
  const SCROLL_TOLERANCE = 8;

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
    const gap =
      parseFloat(carouselStyles.columnGap || carouselStyles.gap) || 0;

    return card.offsetWidth + gap;
  };

  /**
   * Resetta lo stato visivo delle frecce (rimuove classi temporanee)
   */
  const resetVisualState = () => {
    prevButton.classList.remove(
      "perfect-set-chevron--plain",
      "perfect-set-chevron--clicked"
    );

    nextButton.classList.remove(
      "perfect-set-chevron--plain",
      "perfect-set-chevron--clicked"
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

  /**
   * Evento custom:
   * viene emesso quando i prodotti cambiano (es: re-render dinamico)
   * → forza un aggiornamento dello stato del carosello
   */
  document.addEventListener("perfectSetProductsChanged", () => {
    requestAnimationFrame(() => {
      resetVisualState();
      updateButtonsState();
    });
  });

  // Inizializza lo stato dei bottoni al caricamento
  updateButtonsState();
}