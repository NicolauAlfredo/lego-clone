const allCards = document.querySelectorAll(".cards a");

allCards.forEach((card, index) => {
  card.addEventListener("mouseenter", () => {
    // reset tutto
    allCards.forEach((c) => (c.style.transform = "scale(1)"));

    // card principale
    card.style.transform = "scale(1.15)";
    card.style.zIndex = "10";

    // card precedente
    if (allCards[index - 1]) {
      allCards[index - 1].style.transform = "scale(1.1)";
    }

    // card successiva
    if (allCards[index + 1]) {
      allCards[index + 1].style.transform = "scale(1.1)";
    }
  });

  card.addEventListener("mouseleave", () => {
    allCards.forEach((c) => (c.style.transform = "scale(1)"));
  });
});
