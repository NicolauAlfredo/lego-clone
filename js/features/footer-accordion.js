const footerAccordions = document.querySelectorAll(".footer-accordion");
const mobileBreakpoint = window.matchMedia("(max-width: 767px)");

function updateFooterAccordions() {
  footerAccordions.forEach(accordion => {
    if (mobileBreakpoint.matches) {
      accordion.removeAttribute("open");
    } else {
      accordion.setAttribute("open", "");
    }
  });
}

updateFooterAccordions();

window.addEventListener("resize", updateFooterAccordions);