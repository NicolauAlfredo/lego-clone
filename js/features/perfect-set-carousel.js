const scrollContainer = document.querySelector(".perfect-set-scroll");
const carousel = document.querySelector(".perfect-set-carousel");
const prevButton = document.querySelector(".perfect-set-chevron--prev");
const nextButton = document.querySelector(".perfect-set-chevron--next");

if (scrollContainer && carousel && prevButton && nextButton) {
  const SCROLL_TOLERANCE = 8;

  const getMaxScrollLeft = () => {
    return scrollContainer.scrollWidth - scrollContainer.clientWidth;
  };

  const getScrollAmount = () => {
    const card = carousel.querySelector(".perfect-set-article");

    if (!card) return 300;

    const carouselStyles = window.getComputedStyle(carousel);
    const gap = parseFloat(carouselStyles.columnGap || carouselStyles.gap) || 0;

    return card.offsetWidth + gap;
  };

  const resetVisualState = () => {
    prevButton.classList.remove(
      "perfect-set-chevron--plain",
      "perfect-set-chevron--clicked",
    );

    nextButton.classList.remove(
      "perfect-set-chevron--plain",
      "perfect-set-chevron--clicked",
    );
  };

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

  const handleChevronClick = (direction) => {
    const isNext = direction === "next";
    const scrollAmount = getScrollAmount();
    const maxScrollLeft = getMaxScrollLeft();

    const targetScroll = isNext
      ? Math.min(scrollContainer.scrollLeft + scrollAmount, maxScrollLeft)
      : Math.max(scrollContainer.scrollLeft - scrollAmount, 0);

    resetVisualState();

    if (isNext) {
      prevButton.classList.add("perfect-set-chevron--plain");
      nextButton.classList.add("perfect-set-chevron--clicked");
    } else {
      nextButton.classList.add("perfect-set-chevron--plain");
      prevButton.classList.add("perfect-set-chevron--clicked");
    }

    scrollContainer.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });

    setTimeout(() => {
      prevButton.classList.remove("perfect-set-chevron--clicked");
      nextButton.classList.remove("perfect-set-chevron--clicked");

      updateButtonsState();
    }, 500);
  };

  prevButton.addEventListener("click", (event) => {
    event.stopPropagation();
    handleChevronClick("prev");
  });

  nextButton.addEventListener("click", (event) => {
    event.stopPropagation();
    handleChevronClick("next");
  });

  scrollContainer.addEventListener("scroll", updateButtonsState);

  document.addEventListener("click", () => {
    resetVisualState();
    updateButtonsState();
  });

  document.addEventListener("perfectSetProductsChanged", () => {
    updateChevronState();
  });

  updateButtonsState();
}
