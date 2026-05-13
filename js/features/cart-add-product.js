// Importa il modello Cart che gestisce la logica del carrello
import { Cart } from "../models/Cart.js";

// Seleziona il carosello della sezione "Perfect Set"
const carousel = document.querySelector(".perfect-set-carousel");

// Seleziona tutti i contatori del carrello presenti nell'header desktop e mobile
const cartCounters = document.querySelectorAll(
  ".mobile-header__cart-count, .header__cart-count",
);

// Crea una nuova istanza del carrello
const cart = new Cart();

/**
 * Salva i prodotti del carrello nel localStorage.
 *
 * I dati vengono convertiti in formato JSON
 * per poter essere memorizzati nel browser.
 */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart.products));
}

/**
 * Recupera i prodotti salvati nel localStorage
 * e li assegna al carrello corrente.
 *
 * Se non esistono prodotti salvati,
 * viene utilizzato un array vuoto.
 */
function loadCart() {
  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.products = savedCart;
}

/**
 * Aggiorna dinamicamente il contatore del carrello
 * nell'header desktop e mobile.
 *
 * Desktop:
 * (3)
 *
 * Mobile:
 * 3
 */
function updateCartCounters() {
  // Recupera il numero totale di prodotti nel carrello
  const totalItems = cart.countProducts();

  // Aggiorna ogni contatore presente nella pagina
  cartCounters.forEach((counter) => {
    if (counter.classList.contains("header__cart-count")) {
      counter.textContent = `(${totalItems})`;
    } else {
      counter.textContent = totalItems;
    }
  });
}

/**
 * Estrae i dati del prodotto dal bottone cliccato
 * utilizzando gli attributi data-* HTML.
 *
 * Restituisce un oggetto prodotto compatibile
 * con il modello Cart.
 */
function getProductFromButton(button) {
  return {
    id: button.dataset.productId,
    name: button.dataset.productName,

    // Converte il prezzo in numero JavaScript
    // sostituendo eventuali virgole con punti
    price: Number(button.dataset.productPrice.replace(",", ".")),

    image: button.dataset.productImage,
  };
}

/**
 * Gestisce il click sul pulsante
 * "Aggiungi al carrello".
 *
 * Logica:
 * - Verifica se il click proviene da un bottone valido
 * - Recupera i dati del prodotto
 * - Aggiunge il prodotto al carrello
 * - Salva il carrello nel localStorage
 * - Aggiorna il contatore del carrello
 */
function handleAddToCartClick(event) {
  // Cerca il bottone più vicino con data-add-to-cart
  const addToCartButton = event.target.closest("[data-add-to-cart]");

  // Se il click non proviene da un bottone valido,
  // interrompe l'esecuzione
  if (!addToCartButton) {
    return;
  }

  // Evita eventuali comportamenti default del browser
  event.preventDefault();

  // Recupera i dati del prodotto dal bottone cliccato
  const product = getProductFromButton(addToCartButton);

  // Aggiunge il prodotto al carrello
  cart.addProduct(product);

  // Salva il nuovo stato del carrello
  saveCart();

  // Aggiorna i contatori del carrello
  updateCartCounters();

  // Debug console
  console.log("Carrello aggiornato:", cart.products);
  console.table(cart.products);
}

// Carica il carrello salvato al caricamento della pagina
loadCart();

// Aggiorna il contatore iniziale del carrello
updateCartCounters();

// Aggiunge il listener solo se il carosello esiste nel DOM
if (carousel) {
  carousel.addEventListener("click", handleAddToCartClick);
}

// Aggiorna nuovamente i contatori per sicurezza
updateCartCounters();
