const videos = ["video-lego.mp4", "video-lego3.mp4", "video-lego2.mp4"];

let current = 0;

const mainVideo = document.querySelector(".btn-wrapper video");
const leftVideo = document.querySelector(".video-tre video");
const rightVideo = document.querySelector(".video-due video");

function updateCarousel() {
  const left = (current - 1 + videos.length) % videos.length;
  const right = (current + 1) % videos.length;

  mainVideo.src = videos[current];
  leftVideo.src = videos[left];
  rightVideo.src = videos[right];

  mainVideo.play();
  leftVideo.play();
  rightVideo.play();
}

document.querySelector(".freccia-dx").addEventListener("click", () => {
  current = (current + 1) % videos.length;
  updateCarousel();
});

document.querySelector(".freccia-sx").addEventListener("click", () => {
  current = (current - 1 + videos.length) % videos.length;
  updateCarousel();
});

updateCarousel();