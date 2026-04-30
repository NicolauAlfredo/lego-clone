// Seleziona la sezione "Join and Earn" (dove è presente l’animazione della carota)
const joinAndEarnSection = document.querySelector(".join-and-earn");

/**
 * Utilizza IntersectionObserver per attivare/disattivare
 * l’animazione della carota quando la sezione entra o esce dal viewport.
 *
 * Logica:
 * - Quando almeno il 35% della sezione è visibile -> aggiunge la classe "is-visible"
 * - Quando esce dalla viewport -> rimuove la classe "is-visible"
 *
 * La classe "is-visible" viene usata nel CSS per gestire animazioni
 * (es: fade-in, slide, comparsa della carota, ecc.)
 */
if (joinAndEarnSection) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Attiva/disattiva la classe in base alla visibilità dell'elemento
        joinAndEarnSection.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    {
      // Percentuale minima di visibilità per triggerare l’evento
      threshold: 0.35,
    },
  );

  // Inizia l’osservazione della sezione
  observer.observe(joinAndEarnSection);
}
