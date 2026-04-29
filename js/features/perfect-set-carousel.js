const scrollContainer = document.querySelector(".perfect-set-scroll");
const carousel = document.querySelector(".perfect-set-carousel");
const prevButton = document.querySelector(".perfect-set-chevron--prev");
const nextButton = document.querySelector(".perfect-set-chevron--next");

if (scrollContainer && carousel && prevButton && nextButton) {
  const getScrollAmount = () => {
    const card = carousel.querySelector(".perfect-set-article");
    const styles = window.getComputedStyle(carousel);
    const gap = parseFloat(styles.columnGap || styles.gap) || 0;

    return card.offsetWidth + gap;
  };

  prevButton.addEventListener("click", () => {
    scrollContainer.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth",
    });
  });

  nextButton.addEventListener("click", () => {
    scrollContainer.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth",
    });
  });
}
