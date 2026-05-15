// Importa i dati delle categorie 
import { tabsCategories } from "../data/promo-tabs-data.js";

// Container dove verranno reindirizzate le card delle categorie
const carouselCategory = document.querySelector(".section-featured__cards")

// Seleziona i links
const navLink = document.querySelectorAll(".section-featured__nav-link")


// crea il Markup della card di una categoria
function createCategoryCard(category) {
    return `
        <a
            href="#"
            class="section-featured__card"
          >
            <h3 class="section-featured__card-title">
              ${category.name}
            </h3>
            <img
              src="${category.image}"
              alt="${category.name}"
            />
          </a>
    `
}

//Rendering delle categorie

function renderCategory (category){
    const categoria = tabsCategories[category]

    if (!categoria || !carouselCategory){
        return;
    }


// Aggiunge una classe temporanea per gestire cambio categoria
  carouselCategory.classList.add("is-changing");

  // Genera tutte le card e le inserisce nel carosello
  carouselCategory.innerHTML = categoria.map(createCategoryCard).join("");

// Rimuove la classe temporanea dopo il re-render del browser
  requestAnimationFrame(() => {
    carouselCategory.classList.remove("is-changing");
  });
}

  //Aggiorna i link rimuovendo il tag active a tutti e aggiunge soltato alla tab attiva
  function setActiveTab(activeLink) {
  navLink.forEach((link) => {
    link.classList.remove("section-featured__nav-link--active");
  });

  activeLink.classList.add("section-featured__nav-link--active");
}

// Funzione che gestisce il click sui nomi dei link
function handleTabClick(event) {
  event.preventDefault();

  const clickedLink = event.currentTarget;
  const category = clickedLink.dataset.tab;

  setActiveTab(clickedLink);
  renderCategory(category);
}

// Inizializzazione del rendering delle categorie
function initCategoryCarousel() {
    navLink.forEach((link) => {
    link.addEventListener("click", handleTabClick);
  });
    renderCategory("Novita")
}

initCategoryCarousel()