const joinAndEarnSection = document.querySelector(".join-and-earn");

if (joinAndEarnSection) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          joinAndEarnSection.classList.add("is-visible");
        } else {
          joinAndEarnSection.classList.remove("is-visible");
        }
      });
    },
    {
      threshold: 0.35,
    },
  );

  observer.observe(joinAndEarnSection);
}
