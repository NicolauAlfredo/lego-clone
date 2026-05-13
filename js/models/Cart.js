// Modello del carrello
// Responsabilità: gestire lo stato e la logica del carrello (NO DOM)

export function Cart() {
  // Array che contiene tutti i prodotti aggiunti al carrello
  this.products = [];

  // Aggiunge un prodotto al carrello
  this.addProduct = function (product) {
    if (!product || typeof product.price !== "number") {
      console.warn("Prodotto non valido:", product);
      return;
    }

    const existingProduct = this.products.find(
      (i) => i.id === product.id,
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
      return;
    }

    this.products.push({
      ...product,
      quantity: 1,
    });
  };

  // Restituisce il numero totale di prodotti unici
    this.countProductsUnique = function () {
      return this.products.length
    }

  // Restituisce il numero totale di prodotti nel carrello
  this.countProducts = function () {
    return this.products.reduce((total, product) => {
      return total + product.quantity;
    }, 0);
  };

  // Calcola il totale del carrello
  this.calculateTotal = function () {
    return this.products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  // Svuota completamente il carrello
  this.clear = function () {
    this.products = [];
  };
};
