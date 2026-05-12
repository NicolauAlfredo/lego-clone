// Modello del carrello
// Responsabilità: gestire lo stato e la logica del carrello (NO DOM)

export function Cart() {
  // Array che contiene tutti i prodotti aggiunti al carrello
  this.products = [];

  // Aggiunge un prodotto al carrello
  // @param {Object} product - Oggetto prodotto da inserire
  this.addProduct = function (product) {
    // Validazione minima: il prodotto deve esistere e avere un prezzo numerico
    if (!product || typeof product.price !== "number") {
      console.warn("Prodotto non valido:", product);
      return;
    }

    this.products.push(product);
  };

  // Restituisce il numero totale di prodotti nel carrello
  // @returns {number}
  this.countProducts = function () {
    return this.products.length;
  };

  // Calcola il totale del carrello
  // @returns {number}
  this.calculateTotal = function () {
    return this.products.reduce((total, product) => {
      return total + product.price;
    }, 0);
  };

  // Svuota completamente il carrello
  this.clear = function () {
    this.products = [];
  };
  // Rimuove un prodotto specifico dal carrello
  this.removeProduct = function (productId) {
    this.products = this.products.filter((product) => {
      return product.id !== productId;
    });

  }
}