const track = document.querySelector(".weekly-featured__track");
const tabs = document.querySelectorAll(".weekly-featured__tab");
const overlay = document.querySelector(".weekly-featured__overlay");

function setActiveTab(activeTab) {
  tabs.forEach((tab) => {
    tab.classList.remove("weekly-featured__tab--active");
    tab.setAttribute("aria-selected", "false");
  });

  activeTab.classList.add("weekly-featured__tab--active");
  activeTab.setAttribute("aria-selected", "true");
}

function moveToSlide(slideIndex) {
  if (!track) return;

  track.style.transform = `translateX(-${slideIndex * 100}%)`;
}

function updateOverlay(slideIndex) {
  if (!overlay) return;

  if (slideIndex === 0) {
    overlay.classList.remove("weekly-featured__overlay--hidden");
  } else {
    overlay.classList.add("weekly-featured__overlay--hidden");
  }
}

function handleTabClick(event) {
  const clickedTab = event.currentTarget;
  const slideIndex = Number(clickedTab.dataset.slide);

  setActiveTab(clickedTab);
  moveToSlide(slideIndex);
  updateOverlay(slideIndex);
}

tabs.forEach((tab) => {
  tab.addEventListener("click", handleTabClick);
});

moveToSlide(0);
updateOverlay(0);
