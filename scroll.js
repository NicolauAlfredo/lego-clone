const btnWrapper = document.querySelector('.btn-wrapper');
const mainVideo  = btnWrapper.querySelector(':scope > video');
const link       = document.getElementById('carousel-link');
const logo       = document.getElementById('carousel-logo');

const videos = [
  { src: 'video-lego.mp4',  link: 'https://kids.lego.com/it-it/boop', logo: 'assets/images/boop.png' },
  { src: 'video-lego2.mp4', link: 'https://kids.lego.com/it-it/...',  logo: 'assets/images/boop.png' },
  { src: 'video-lego3.mp4', link: 'https://kids.lego.com/it-it/...',  logo: 'assets/images/boop.png' },
];

let current = 0;
let startX = 0;
let startY = 0;

function goTo(index) {
  current = (index + videos.length) % videos.length;
  mainVideo.src = videos[current].src;
  link.href     = videos[current].link;
  logo.src      = videos[current].logo;
  mainVideo.load();
  mainVideo.play().catch(() => {});
}

// Touch swipe
btnWrapper.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
}, { passive: true });

btnWrapper.addEventListener('touchend', (e) => {
  const dx = startX - e.changedTouches[0].clientX;
  const dy = startY - e.changedTouches[0].clientY;
  if (Math.abs(dx) < 40 || Math.abs(dy) > Math.abs(dx)) return;
  goTo(dx > 0 ? current + 1 : current - 1);
}, { passive: true });

// Mouse drag (per testare da desktop)
let mouseStartX = 0;
let mouseDown = false;

btnWrapper.addEventListener('mousedown', (e) => {
  mouseStartX = e.clientX;
  mouseDown = true;
});

btnWrapper.addEventListener('mouseup', (e) => {
  if (!mouseDown) return;
  mouseDown = false;
  const dx = mouseStartX - e.clientX;
  if (Math.abs(dx) < 40) return;
  goTo(dx > 0 ? current + 1 : current - 1);
});

// Frecce
document.querySelector('.freccia-dx').addEventListener('click', (e) => {
  e.preventDefault();
  goTo(current + 1);
});

document.querySelector('.freccia-sx').addEventListener('click', (e) => {
  e.preventDefault();
  goTo(current - 1);
});