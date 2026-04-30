// Importiamo il modello del carrello (logica pura, senza DOM)
import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";

// Creiamo una singola istanza del carrello (stato globale della pagina)
const cart = new Cart();

// Selezioniamo entrambi i contatori:
// - mobile (.mobile-header__cart-count)
// - desktop (.header__cart-count)
const cartCounters = document.querySelectorAll(
  ".mobile-header__cart-count, .header__cart-count",
);

// Selezioniamo il contenitore del carousel
// Usiamo questo elemento per applicare event delegation sui bottoni
const carousel = document.querySelector(".perfect-set-carousel");

/**
 * Aggiorna il numero di prodotti mostrato nel carrello (header)
 *
 * Logica:
 * - Recupera il numero totale di prodotti dal modello (Cart)
 * - Aggiorna tutti i contatori trovati nel DOM
 * - Gestisce differenza UI:
 *    mobile → numero semplice (es: 2)
 *    desktop → numero tra parentesi (es: (2))
 */
function updateCartCounter() {
  const totalProducts = cart.countProducts();

  cartCounters.forEach((counter) => {
    // Verifica se il contatore è quello desktop
    const isDesktopCounter = counter.classList.contains("header__cart-count");

    // Aggiorna il testo in base al tipo di UI
    counter.textContent = isDesktopCounter
      ? `(${totalProducts})`
      : totalProducts;
  });
}

/**
 * Gestisce il click sui bottoni "Aggiungi al carrello"
 *
 * Strategia:
 * - Event delegation sul carousel (più performante)
 * - Usa closest() per intercettare il bottone corretto
 * - Legge i dati del prodotto dagli attributi data-*
 * - Costruisce un oggetto prodotto
 * - Lo aggiunge al carrello
 * - Aggiorna il contatore UI
 */
function handleAddToCart(event) {
  // Cerca il bottone cliccato (o un suo parent) con data-add-to-cart
  const button = event.target.closest("[data-add-to-cart]");

  // Se il click non proviene da un bottone valido, esce
  if (!button) return;

  // Costruzione oggetto prodotto a partire dai data attributes
  const product = new Product({
    id: button.dataset.productId,
    name: button.dataset.productName,
    price: Number(button.dataset.productPrice), // conversione da string a number
  });

  // Aggiunge il prodotto al modello (stato applicativo)
  cart.addProduct(product);

  // Aggiorna immediatamente il contatore nel DOM
  updateCartCounter();
}

// Se il carousel esiste, aggiungiamo il listener
// Questo permette di intercettare tutti i bottoni dinamici generati via JS
if (carousel) {
  carousel.addEventListener("click", handleAddToCart);
}

// Inizializzazione:
// sincronizza il contatore UI con lo stato iniziale del carrello (0)
updateCartCounter();
