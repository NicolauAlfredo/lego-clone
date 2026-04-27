import { sets } from "../data/sets.js";
import { cardProduct } from "../models/Set.js";
import { Carrello } from "../models/Cart.js";
import { togglePreferito } from "../features/favorites.js";

function log(title, data) {
  console.log(`\n==== ${title} ====`);
  console.log(data);
}

function pass(message) {
  console.log(`PASS: ${message}`);
}

function fail(message, received) {
  console.error(`FAIL: ${message}`);

  if (received !== undefined) {
    console.error("Received:", received);
  }
}

function assert(condition, message, received) {
  if (condition) {
    pass(message);
  } else {
    fail(message, received);
  }
}

console.log("\n==============================");
console.log("TEST JS MODELS VALIDATION");
console.log("==============================");

// ======================================================
// TEST 1 - Verifica dati base
// ======================================================

log("RAW SETS DATA", sets);

assert(Array.isArray(sets), "sets deve essere un array", sets);
assert(sets.length > 0, "sets deve contenere almeno un elemento", sets.length);

const firstRawSet = sets[0];

assert(Boolean(firstRawSet.id), "ogni set deve avere un id", firstRawSet);
assert(
  Boolean(firstRawSet.linkImage),
  "ogni set deve avere linkImage",
  firstRawSet,
);
assert(
  typeof firstRawSet.minAge === "number",
  "minAge deve essere un numero",
  firstRawSet.minAge,
);
assert(
  typeof firstRawSet.pieces === "number",
  "pieces deve essere un numero",
  firstRawSet.pieces,
);
assert(
  typeof firstRawSet.price === "number",
  "price deve essere un numero",
  firstRawSet.price,
);
assert(
  typeof firstRawSet.rating === "number",
  "rating deve essere un numero",
  firstRawSet.rating,
);
assert(
  typeof firstRawSet.favorite === "boolean",
  "favorite deve essere boolean",
  firstRawSet.favorite,
);

// ======================================================
// TEST 2 - Instanciazione Set
// ======================================================

const setInstances = sets.map(
  (data) =>
    new cardProduct(
      data.id,
      data.linkImage,
      data.minAge,
      data.pieces,
      data.price,
      data.rating,
      data.favorite,
    ),
);

log("SET INSTANCES", setInstances);

assert(
  setInstances.length === sets.length,
  "deve creare una istanza per ogni elemento in sets",
  setInstances.length,
);

assert(
  setInstances[0].id === firstRawSet.id,
  "la proprietà id deve essere assegnata correttamente",
  setInstances[0].id,
);

assert(
  setInstances[0].linkImage === firstRawSet.linkImage,
  "linkImage deve ricevere il valore di linkImage",
  setInstances[0].linkImage,
);

assert(
  setInstances[0].age === firstRawSet.minAge,
  "age deve ricevere il valore di minAge",
  setInstances[0].age,
);

assert(
  setInstances[0].blocks === firstRawSet.pieces,
  "blocks deve ricevere il valore di pieces",
  setInstances[0].blocks,
);

assert(
  setInstances[0].price === firstRawSet.price,
  "price deve essere assegnato correttamente",
  setInstances[0].price,
);

assert(
  setInstances[0].rating === firstRawSet.rating,
  "rating deve essere assegnato correttamente",
  setInstances[0].rating,
);

assert(
  setInstances[0].favorite === firstRawSet.favorite,
  "favorite deve essere assegnato correttamente",
  setInstances[0].favorite,
);

// ======================================================
// TEST 3 - Carrello
// ======================================================

const cart = new Carrello();

assert(
  Array.isArray(cart.prodotti),
  "Carrello deve avere una proprietà prodotti di tipo array",
  cart.prodotti,
);

assert(
  cart.calcolaNumeroSet() === 0,
  "un carrello nuovo deve avere 0 set",
  cart.calcolaNumeroSet(),
);

cart.aggiungiSet(setInstances[0]);
cart.aggiungiSet(setInstances[1]);

log("CART PRODUCTS", cart.prodotti);

assert(
  cart.calcolaNumeroSet() === 2,
  "calcolaNumeroSet deve restituire il numero corretto di set",
  cart.calcolaNumeroSet(),
);

const expectedTotal = setInstances[0].price + setInstances[1].price;

assert(
  cart.calcolaTotale() === expectedTotal,
  "calcolaTotale deve sommare correttamente i prezzi",
  cart.calcolaTotale(),
);

// ======================================================
// TEST 4 - Favorites
// ======================================================

const targetId = setInstances[0].id;
const favoriteBefore = setInstances[0].favorite;

log("FAVORITE BEFORE", {
  id: targetId,
  favorite: favoriteBefore,
});

let favoriteResult;

try {
  favoriteResult = togglePreferito(targetId);

  log("FAVORITES FUNCTION RESULT", favoriteResult);

  pass("togglePreferito viene eseguita senza errore di sintassi");
} catch (error) {
  fail("togglePreferito genera un errore durante l'esecuzione", error.message);
}

const favoriteAfter = setInstances[0].favorite;

log("FAVORITE AFTER", {
  id: targetId,
  favorite: favoriteAfter,
});

assert(
  favoriteAfter !== favoriteBefore,
  "togglePreferito dovrebbe invertire il valore favorite del set",
  {
    before: favoriteBefore,
    after: favoriteAfter,
  },
);

if (favoriteAfter === favoriteBefore) {
  console.error("\nBUG LOGICO TROVATO:");
  console.error(
    "togglePreferito non modifica il set perché usa CardProduct come se fosse un array globale.",
  );
  console.error(
    "La funzione dovrebbe ricevere la lista dei set come parametro, per esempio: togglePreferito(setInstances, id).",
  );
}

// ======================================================
// TEST 5 - Verifica comportamento atteso corretto
// ======================================================

function expectedTogglePreferito(setList, id) {
  const foundSet = setList.find((set) => set.id === id);

  if (!foundSet) {
    return null;
  }

  foundSet.favorite = !foundSet.favorite;
  return foundSet;
}

const expectedResult = expectedTogglePreferito(setInstances, targetId);

log("EXPECTED CORRECT TOGGLE RESULT", expectedResult);

assert(
  expectedResult.favorite === !favoriteAfter,
  "una versione corretta della funzione riesce a invertire favorite",
  expectedResult,
);

console.log("\n==============================");
console.log("TEST COMPLETATI");
console.log("==============================");