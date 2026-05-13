// Modello del carrello
// Responsabilità:
// - gestire lo stato del carrello
// - gestire la logica dei prodotti
// - gestire la persistenza nel localStorage
// - NON manipolare il DOM

export function Cart(storageKey = "cart") {
  // Chiave utilizzata per salvare il carrello nel localStorage
  this.storageKey = storageKey;

  // Array che contiene tutti i prodotti aggiunti al carrello
  this.products = [];

  /**
   * Carica i prodotti del carrello dal localStorage.
   *
   * Se non esistono prodotti salvati,
   * inizializza il carrello con un array vuoto.
   */
  this.load = function () {
    this.products = JSON.parse(localStorage.getItem(this.storageKey)) || [];
  };

  /**
   * Salva lo stato corrente del carrello nel localStorage.
   */
  this.save = function () {
    localStorage.setItem(this.storageKey, JSON.stringify(this.products));
  };

  /**
   * Aggiunge un prodotto al carrello.
   *
   * Se il prodotto esiste già,
   * aumenta la quantità di 1.
   */
  this.addProduct = function (product) {
    if (!product || !product.id || typeof product.price !== "number") {
      console.warn("Prodotto non valido:", product);
      return;
    }

    const existingProduct = this.products.find((item) => {
      return item.id === product.id;
    });

    if (existingProduct) {
      existingProduct.quantity += 1;
      return;
    }

    this.products.push({
      ...product,
      quantity: 1,
    });
  };

  /**
   * Rimuove completamente un prodotto dal carrello.
   */
  this.removeProduct = function (productId) {
    this.products = this.products.filter((product) => {
      return product.id !== productId;
    });
  };

  /**
   * Aumenta di 1 la quantità di un prodotto.
   */
  this.increaseProductQuantity = function (productId) {
    const product = this.products.find((product) => {
      return product.id === productId;
    });

    if (!product) {
      return;
    }

    product.quantity += 1;
  };

  /**
   * Diminuisce di 1 la quantità di un prodotto.
   *
   * Se la quantità è già 1,
   * il prodotto non viene modificato.
   */
  this.decreaseProductQuantity = function (productId) {
    const product = this.products.find((product) => {
      return product.id === productId;
    });

    if (!product || product.quantity === 1) {
      return;
    }

    product.quantity -= 1;
  };

  /**
   * Restituisce il numero totale di prodotti unici.
   */
  this.countProductsUnique = function () {
    return this.products.length;
  };

  /**
   * Restituisce il numero totale di articoli nel carrello.
   */
  this.countProducts = function () {
    return this.products.reduce((total, product) => {
      return total + product.quantity;
    }, 0);
  };

  /**
   * Calcola il subtotale del carrello.
   */
  this.calculateSubtotal = function () {
    return this.products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  /**
   * Calcola il valore IVA.
   *
   * Default: 22%
   */
  this.calculateIva = function (rate = 0.22) {
    return this.calculateSubtotal() * rate;
  };

  /**
   * Calcola il totale del carrello.
   *
   * In questo progetto il totale coincide con il subtotale,
   * perché l'IVA è già inclusa nel prezzo.
   */
  this.calculateTotal = function () {
    return this.calculateSubtotal();
  };

  /**
   * Svuota completamente il carrello.
   */
  this.clear = function () {
    this.products = [];
  };
}