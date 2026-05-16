// Modello Wishlist
// Responsabilità:
// - gestire più liste dei desideri
// - salvare nome, data di aggiornamento e prodotti di ogni lista
// - gestire la persistenza nel localStorage
// - NON manipolare il DOM

export function Wishlist(storageKey = "wishlists") {
  // Chiave utilizzata per salvare tutte le liste nel localStorage
  this.storageKey = storageKey;

  // Array che contiene tutte le liste dei desideri
  this.lists = [];

  /**
   * Carica le liste dei desideri dal localStorage.
   *
   * Se non esiste ancora nessuna lista salvata,
   * inizializza this.lists con un array vuoto.
   */
  this.load = function () {
    this.lists = JSON.parse(localStorage.getItem(this.storageKey)) || [];
  };

  /**
   * Salva lo stato corrente delle liste nel localStorage.
   */
  this.save = function () {
    localStorage.setItem(this.storageKey, JSON.stringify(this.lists));
  };

  /**
   * Crea una nuova lista dei desideri.
   *
   * Ogni lista contiene:
   * - id univoco
   * - nome
   * - data ultimo aggiornamento
   * - array di prodotti
   */
  this.createList = function (name) {
    if (!name || !name.trim()) {
      console.warn("Nome lista non valido:", name);
      return null;
    }

    const newList = {
      id: crypto.randomUUID(),
      name: name.trim(),
      updatedAt: new Date().toISOString(),
      products: [],
    };

    this.lists.push(newList);
    this.save();

    return newList;
  };

  /**
   * Restituisce tutte le liste dei desideri.
   */
  this.getLists = function () {
    return this.lists;
  };

  /**
   * Cerca una lista tramite il suo id.
   */
  this.getListById = function (listId) {
    return this.lists.find((list) => {
      return list.id === listId;
    });
  };

  /**
   * Verifica se un prodotto è già presente in una lista specifica.
   */
  this.hasProductInList = function (listId, productId) {
    const list = this.getListById(listId);

    if (!list) {
      return false;
    }

    return list.products.some((product) => {
      return product.id === productId;
    });
  };

  /**
   * Verifica se un prodotto è presente in almeno una lista.
   */
  this.hasProduct = function (productId) {
    return this.lists.some((list) => {
      return list.products.some((product) => {
        return product.id === productId;
      });
    });
  };

  /**
   * Aggiunge un prodotto a una lista specifica.
   *
   * Se il prodotto è già presente nella lista,
   * non viene aggiunto una seconda volta.
   */
  this.addProductToList = function (listId, product) {
    const list = this.getListById(listId);

    if (!list) {
      console.warn("Lista non trovata:", listId);
      return;
    }

    if (!product || !product.id) {
      console.warn("Prodotto non valido:", product);
      return;
    }

    if (this.hasProductInList(listId, product.id)) {
      return;
    }

    list.products.push(product);
    list.updatedAt = new Date().toISOString();

    this.save();
  };

  /**
   * Rimuove un prodotto da una lista specifica.
   */
  this.removeProductFromList = function (listId, productId) {
    const list = this.getListById(listId);

    if (!list) {
      return;
    }

    list.products = list.products.filter((product) => {
      return product.id !== productId;
    });

    list.updatedAt = new Date().toISOString();

    this.save();
  };

  /**
   * Calcola il totale economico di una lista.
   */
  this.calculateListTotal = function (listId) {
    const list = this.getListById(listId);

    if (!list) {
      return 0;
    }

    return list.products.reduce((total, product) => {
      return total + Number(product.price);
    }, 0);
  };

  /**
   * Conta quanti prodotti ci sono in una lista.
   */
  this.countProductsInList = function (listId) {
    const list = this.getListById(listId);

    if (!list) {
      return 0;
    }

    return list.products.length;
  };
}
