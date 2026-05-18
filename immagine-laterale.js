const thumb = document.querySelector('.immagine-laterale');
const expanded = document.querySelector('.immagine-laterale-intera-wrapper');
const chiudi = document.querySelector('.chiudi-btn');

thumb.addEventListener('click', () => {
  thumb.style.display = 'none';
  expanded.style.display = 'block';
});

chiudi.addEventListener('click', () => {
  expanded.style.display = 'none';
  thumb.style.display = 'block';
});