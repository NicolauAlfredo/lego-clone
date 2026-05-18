// TODO:
// Verificare che gli elementi DOM esistano prima di registrare event listener.
// In una struttura multi-page, questo script potrebbe essere caricato anche
// in pagine dove questi elementi non sono presenti.
const thumb = document.querySelector(".immagine-laterale");
const expanded = document.querySelector(".immagine-laterale-intera-wrapper");
const chiudi = document.querySelector(".chiudi-btn");

thumb.addEventListener("click", () => {
  // TODO:
  // Evitare modifiche inline dello style via JavaScript.
  // Meglio aggiungere/rimuovere classi CSS dedicate,
  // per esempio usando classList.add() / classList.remove().
  // Il codice diventa più scalabile e più semplice da mantenere.
  thumb.style.display = "none";
  expanded.style.display = "block";

  // TODO:
  // Aggiornare anche attributi di accessibilità come aria-hidden
  // quando il pannello viene aperto o chiuso.
});

chiudi.addEventListener("click", () => {
  // TODO:
  // Evitare modifiche inline dello style via JavaScript.
  // Questa logica dovrebbe idealmente essere gestita tramite classi CSS.
  expanded.style.display = "none";
  thumb.style.display = "block";

  // TODO:
  // Aggiornare anche aria-hidden / aria-expanded se questo elemento
  // rappresenta un pannello apribile/chiudibile.
});