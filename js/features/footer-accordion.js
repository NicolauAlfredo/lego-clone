const footerAccordions = document.querySelectorAll(".footer-accordion");
const footerBreakpoint = window.matchMedia("(max-width: 1024px)");

function updateFooterAccordions() {
  footerAccordions.forEach((accordion) => {
    if (footerBreakpoint.matches) {
      accordion.removeAttribute("open");
    } else {
      accordion.setAttribute("open", "");
    }
  });
}

updateFooterAccordions();

footerBreakpoint.addEventListener("change", updateFooterAccordions);