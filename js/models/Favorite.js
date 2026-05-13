// Modello dei preferiti
// Responsabilità:
// - gestire lo stato dei prodotti preferiti
// - gestire la persistenza nel localStorage
// - NON manipolare il DOM

export function Favorite(storageKey = "favorites") {
  // Chiave utilizzata per salvare i preferiti nel localStorage
  this.storageKey = storageKey;

  // Array che contiene tutti i prodotti aggiunti ai preferiti
  this.products = [];

  /**
   * Carica i prodotti preferiti dal localStorage.
   *
   * Se non esistono prodotti salvati,
   * inizializza la lista con un array vuoto.
   */
  this.load = function () {
    this.products = JSON.parse(localStorage.getItem(this.storageKey)) || [];
  };

  /**
   * Salva lo stato corrente dei preferiti nel localStorage.
   */
  this.save = function () {
    localStorage.setItem(this.storageKey, JSON.stringify(this.products));
  };

  /**
   * Verifica se un prodotto è già presente nei preferiti.
   *
   * @param {string} productId - ID del prodotto da verificare.
   * @returns {boolean}
   */
  this.hasProduct = function (productId) {
    return this.products.some((product) => {
      return product.id === productId;
    });
  };

  /**
   * Aggiunge un prodotto ai preferiti.
   *
   * Se il prodotto esiste già,
   * non viene aggiunto una seconda volta.
   *
   * @param {Object} product - Prodotto da aggiungere.
   */
  this.addProduct = function (product) {
    if (!product || !product.id) {
      console.warn("Prodotto non valido:", product);
      return;
    }

    if (this.hasProduct(product.id)) {
      return;
    }

    this.products.push(product);
  };

  /**
   * Rimuove un prodotto dai preferiti.
   *
   * @param {string} productId - ID del prodotto da rimuovere.
   */
  this.removeProduct = function (productId) {
    this.products = this.products.filter((product) => {
      return product.id !== productId;
    });
  };

  /**
   * Aggiunge o rimuove un prodotto dai preferiti.
   *
   * Se il prodotto è già presente,
   * viene rimosso.
   *
   * Se non è presente,
   * viene aggiunto.
   *
   * @param {Object} product - Prodotto da aggiungere/rimuovere.
   */
  this.toggleProduct = function (product) {
    if (!product || !product.id) {
      console.warn("Prodotto non valido:", product);
      return;
    }

    if (this.hasProduct(product.id)) {
      this.removeProduct(product.id);
      return;
    }

    this.addProduct(product);
  };

  /**
   * Restituisce il numero totale di prodotti preferiti.
   *
   * @returns {number}
   */
  this.countProducts = function () {
    return this.products.length;
  };

  /**
   * Restituisce tutti i prodotti preferiti.
   *
   * @returns {Array}
   */
  this.getProducts = function () {
    return this.products;
  };

  /**
   * Svuota completamente la lista dei preferiti.
   */
  this.clear = function () {
    this.products = [];
  };
}
