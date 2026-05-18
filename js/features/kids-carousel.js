const videos = ["../assets/pages/kids/videos/video-lego.mp4", "../assets/pages/kids/videos/video-lego3.mp4", "../assets/pages/kids/videos/video-lego2.mp4"];

let current = 0;

// TODO:
// Evitare selettori troppo generici come ".btn-wrapper video".
// Se la struttura HTML cambia o vengono aggiunti altri video,
// questo script potrebbe selezionare l'elemento sbagliato.
// Meglio usare classi dedicate per ogni video del carousel.
const mainVideo = document.querySelector(".btn-wrapper video");

// TODO:
// Verificare che gli elementi DOM esistano prima di usarli.
// In un progetto multi-page questo script potrebbe essere caricato anche dove
// alcuni elementi non esistono, causando errori runtime.
const leftVideo = document.querySelector(".video-tre video");
const rightVideo = document.querySelector(".video-due video");

function updateCarousel() {
  const left = (current - 1 + videos.length) % videos.length;
  const right = (current + 1) % videos.length;

  mainVideo.src = videos[current];
  leftVideo.src = videos[left];
  rightVideo.src = videos[right];

  // TODO:
  // Gestire eventuali errori di autoplay.
  // Alcuni browser possono bloccare video.play() senza interazione utente,
  // quindi sarebbe meglio usare .play().catch(...) per evitare errori non gestiti.
  mainVideo.play();
  leftVideo.play();
  rightVideo.play();
}

// TODO:
// Verificare che ".freccia-dx" esista prima di chiamare addEventListener.
// Se il bottone non è presente nella pagina, il codice genera un errore.
document.querySelector(".freccia-dx").addEventListener("click", () => {
  current = (current + 1) % videos.length;
  updateCarousel();
});

// TODO:
// Verificare che ".freccia-sx" esista prima di chiamare addEventListener.
// Se il bottone non è presente nella pagina, il codice genera un errore.
document.querySelector(".freccia-sx").addEventListener("click", () => {
  current = (current - 1 + videos.length) % videos.length;
  updateCarousel();
});

// TODO:
// Valutare una funzione riutilizzabile per evitare duplicazione
// della logica nei controlli del carousel.
updateCarousel();
