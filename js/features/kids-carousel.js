const videos = [
  "../assets/pages/kids/videos/video-lego.mp4",
  "../assets/pages/kids/videos/video-lego3.mp4",
  "../assets/pages/kids/videos/video-lego2.mp4",
];

let current = 0;

const mainVideo = document.querySelector(".btn-wrapper video");
const leftVideo = document.querySelector(".video-tre video");
const rightVideo = document.querySelector(".video-due video");

// TODO:
// Verificare che gli elementi DOM esistano prima di usarli.
// Se questo file JS viene caricato in una pagina dove manca il carousel,
// mainVideo, leftVideo o rightVideo potrebbero essere null e causare errori.
function updateCarousel() {
  const left = (current - 1 + videos.length) % videos.length;
  const right = (current + 1) % videos.length;

  mainVideo.src = videos[current];
  leftVideo.src = videos[left];
  rightVideo.src = videos[right];

  // TODO:
  // Gestire eventuali errori di autoplay.
  // Alcuni browser possono bloccare video.play(), quindi sarebbe più sicuro usare:
  // mainVideo.play().catch(() => {});
  mainVideo.play();
  leftVideo.play();
  rightVideo.play();
}

// TODO:
// Salvare il bottone in una variabile e verificare che esista prima di usare addEventListener.
// Se ".freccia-dx" non esiste, document.querySelector(".freccia-dx") restituisce null
// e il codice va in errore.
document.querySelector(".freccia-dx").addEventListener("click", () => {
  current = (current + 1) % videos.length;
  updateCarousel();
});

// TODO:
// Stessa cosa per ".freccia-sx": controllare prima che il bottone esista.
// Questo rende il codice più robusto in un progetto multi-page.
document.querySelector(".freccia-sx").addEventListener("click", () => {
  current = (current - 1 + videos.length) % videos.length;
  updateCarousel();
});

// TODO:
// Prima di chiamare updateCarousel(), sarebbe meglio assicurarsi che i tre video esistano.
// In caso contrario, la funzione proverà ad accedere a .src di null.
updateCarousel();

// Swipe solo su mobile
// TODO:
// Questa scelta è intenzionale: lo swipe viene attivato solo su telefono,
// perché su desktop e tablet esistono già le frecce.
// Se in futuro si vuole supportare anche drag con mouse o tablet,
// si possono aggiungere eventi mouse/pointer senza rimuovere questa logica.
if (window.innerWidth <= 480) {
  let startX = 0;
  let startY = 0;

  // TODO:
  // Salvare ".btn-wrapper" in una variabile invece di fare querySelector più volte.
  // Esempio:
  // const swipeArea = document.querySelector(".btn-wrapper");
  // if (!swipeArea) return;
  //
  // Così il codice è più leggibile e non rischia errori se l'elemento non esiste.
  document.querySelector(".btn-wrapper").addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    },
    { passive: true },
  );

  // TODO:
  // Attualmente viene controllato solo touchstart e touchend.
  // Per una gestione più precisa dello swipe si potrebbe aggiungere touchmove,
  // così è possibile capire se l'utente sta davvero trascinando orizzontalmente
  // e prevenire click accidentali sul link del video.
  document.querySelector(".btn-wrapper").addEventListener(
    "touchend",
    (e) => {
      const dx = startX - e.changedTouches[0].clientX;
      const dy = startY - e.changedTouches[0].clientY;

      // TODO:
      // La soglia di 40px funziona, ma potrebbe essere estratta in una costante.
      // Esempio:
      // const MIN_SWIPE_DISTANCE = 40;
      // Così il valore è più chiaro e facile da modificare.
      if (Math.abs(dx) < 40 || Math.abs(dy) > Math.abs(dx)) return;

      if (dx > 0) {
        current = (current + 1) % videos.length;
      } else {
        current = (current - 1 + videos.length) % videos.length;
      }

      updateCarousel();
    },
    { passive: true },
  );

  // TODO:
  // Se il video principale è dentro un <a>, dopo uno swipe il browser potrebbe
  // comunque interpretare il gesto come click sul link.
  // Una possibile miglioria è usare una variabile hasMoved e bloccare il click
  // solo quando l'utente ha realmente trascinato.
}

// TODO:
// Possibile miglioramento futuro:
// creare funzioni riutilizzabili goNext() e goPrev().
// In questo momento la logica per cambiare slide è ripetuta nelle frecce e nello swipe.
//
// Esempio:
// function goNext() {
//   current = (current + 1) % videos.length;
//   updateCarousel();
// }
//
// function goPrev() {
//   current = (current - 1 + videos.length) % videos.length;
//   updateCarousel();
// }

// TODO:
// Possibile miglioramento futuro:
// aggiungere una transizione più fluida tra i video.
// Al momento il cambio di src è immediato, quindi il passaggio può sembrare brusco.
// Si può migliorare con una classe CSS di fade usando opacity e transition.

// TODO:
// Possibile miglioramento futuro:
// usare matchMedia invece di window.innerWidth.
// Esempio:
// const isPhone = window.matchMedia("(max-width: 480px)").matches;
// È più coerente con il modo in cui CSS gestisce le media query.
