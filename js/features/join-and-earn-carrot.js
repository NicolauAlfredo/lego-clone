const joinAndEarnSection = document.querySelector(".join-and-earn");

if (joinAndEarnSection) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        joinAndEarnSection.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    {
      threshold: 0.35,
    },
  );

  observer.observe(joinAndEarnSection);
}
