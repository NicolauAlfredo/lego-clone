import { perfectSetProducts } from "../data/perfect-set-products.js";
import { formatCurrency } from "../utils/currency.js";

const carousel = document.querySelector(".perfect-set-carousel");
const scrollContainer = document.querySelector(".perfect-set-scroll");
const navLinks = document.querySelectorAll(".perfect-set-nav-link");

function createRatingMarkup(rating) {
  if (!rating) {
    return "";
  }

  return `
    <span>
        <svg class="perfect-set-attributes-icons star-icon" viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="m21.763 5.111 4.062 8.313 8.938 1.312c.75.125 1.375.625 1.625 1.375.25.688.062 1.5-.5 2l-6.5 6.438 1.562 9.125c.125.75-.187 1.5-.812 1.937-.625.5-1.438.5-2.125.188l-8-4.313L11.95 35.8c-.625.312-1.437.312-2.062-.188a1.963 1.963 0 0 1-.813-1.937l1.5-9.125-6.5-6.438c-.5-.5-.687-1.312-.5-2 .25-.75.875-1.25 1.625-1.375l9-1.312 4-8.313c.313-.687 1-1.125 1.813-1.125.75 0 1.437.438 1.75 1.125Z"/></svg>
      ${rating}
    </span>
  `;
}

function createBadgeMarkup(isNew) {
  if (!isNew) {
    return "";
  }

  return `
    <div class="perfect-set-badge">
      <span>Novità</span>
    </div>
  `;
}

function createProductCard(product) {
  return `
    <article class="perfect-set-article">
      ${createBadgeMarkup(product.isNew)}

      <div class="perfect-set-card-image">
        <a href="#" class="perfect-set-link-product">
          <img
            class="perfect-set-card-image-product"
            src="${product.image}"
            alt="${product.alt}"
          />
        </a>
      </div>

      <div class="perfect-set-attributes">
        <span>
          <span class="perfect-set-attributes-icons">
            <img src="./assets/global/icons/birthday-cake-icon.svg" alt="" />
          </span>
          ${product.age}
        </span>

        <span>
          <span class="perfect-set-attributes-icons">
            <img src="./assets/global/icons/brick-one-icon.svg" alt="" />
          </span>
          ${product.pieces}
        </span>

        ${createRatingMarkup(product.rating)}
      </div>

      <h3 class="perfect-set-product-name">
        <a href="#" class="perfect-set-product-name-text">
          ${product.name}
        </a>
      </h3>

      <div class="perfect-set-price">
        <span>${formatCurrency(product.price)}</span>
      </div>

      <div class="perfect-set-carrello-container">
        <div class="perfect-set-carrello-btn">
          <button
            class="perfect-set-carrello-aggiungi-al-carrello"
            type="button"
          >
            <img
              src="./assets/global/icons/shopping-bag-icon.svg"
              alt=""
              class="carrello-bag-icon"
            />
            Aggiungi al carrello
          </button>
        </div>

        <button
          class="perfect-set-carrello-btn-responsive"
          type="button"
          aria-label="Aggiungi ${product.name} al carrello"
        >
          <img
            src="./assets/global/icons/shopping-bag-icon.svg"
            alt=""
            class="carrello-bag-icon"
          />
        </button>

        <button
          class="perfect-set-favorite-button"
          type="button"
          aria-label="Aggiungi ${product.name} ai preferiti"
        >
          <img src="./assets/global/icons/heart-icon.svg" alt="" />
        </button>
      </div>
    </article>
  `;
}

function renderProducts(category) {
  const products = perfectSetProducts[category];

  if (!products || !carousel) {
    return;
  }

  carousel.classList.add("is-changing");

  carousel.innerHTML = products.map(createProductCard).join("");

  if (scrollContainer) {
    scrollContainer.scrollLeft = 0;
  }

  document.dispatchEvent(new CustomEvent("perfectSetProductsChanged"));

  requestAnimationFrame(() => {
    carousel.classList.remove("is-changing");
  });
}

function setActiveTab(activeLink) {
  navLinks.forEach((link) => {
    link.classList.remove("perfect-set-nav-link--active");
  });

  activeLink.classList.add("perfect-set-nav-link--active");
}

function handleTabClick(event) {
  event.preventDefault();

  const clickedLink = event.currentTarget;
  const category = clickedLink.dataset.category;

  setActiveTab(clickedLink);
  renderProducts(category);
}

navLinks.forEach((link) => {
  link.addEventListener("click", handleTabClick);
});

renderProducts("inEvidenza");
