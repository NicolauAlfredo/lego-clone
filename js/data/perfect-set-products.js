// Import del modello Product, che rappresenta un singolo set LEGO
import { Product } from "../models/Product.js";

/**
 * Restituisce l'URL assoluto di un'immagine prodotto.
 *
 * Usiamo import.meta.url perché il percorso viene risolto
 * rispetto a questo file JavaScript, non rispetto alla pagina HTML.
 *
 * Questo evita problemi su GitHub Pages, dove i percorsi relativi
 * come "./assets/..." possono rompersi quando il modulo viene usato
 * da pagine diverse.
 */
export const getProductImageUrl = (fileName) =>
  new URL("../../assets/pages/home/images/" + fileName, import.meta.url).href;

/**
 * Collezione di prodotti utilizzata nella sezione "Perfect Set"
 * della homepage.
 *
 * La struttura è organizzata per categorie (es: "inEvidenza", "pasqua"),
 * ognuna contenente un array di istanze della classe Product.
 *
 * NOTA:
 * - Ogni prodotto è creato tramite il costruttore Product
 * - I dati sono statici (mock), ma progettati per essere facilmente
 *   sostituibili con dati provenienti da API in futuro
 * - Le immagini vengono risolte tramite getProductImageUrl()
 *   per funzionare correttamente anche su GitHub Pages
 */
export const perfectSetProducts = {
  /**
   * Prodotti in evidenza (highlight principali della pagina)
   */
  inEvidenza: [
    // Set iconico Ferrari F1 guidata da Michael Schumacher
    new Product({
      id: "ferrari-f2004-schumacher",
      name: "Ferrari F2004 e Michael Schumacher",
      image: getProductImageUrl("ferrari-f2004-schumacher.png"),
      alt: "Set LEGO Ferrari F2004 e Michael Schumacher",
      age: "18+",
      pieces: "735",
      rating: "4.9",
      price: 89.99,
      isNew: true,
    }),

    // Set decorativo floreale (magnolia)
    new Product({
      id: "rametti-magnolia",
      name: "Rametti di magnolia",
      image: getProductImageUrl("magnolia-branches.png"),
      alt: "Set LEGO Rametti di magnolia",
      age: "18+",
      pieces: "435",
      rating: null,
      price: 49.99,
      isNew: true,
    }),

    // Bouquet decorativo di girasoli
    new Product({
      id: "bouquet-girasoli-evidenza",
      name: "Bouquet di girasoli",
      image: getProductImageUrl("sunflower-bouquet.png"),
      alt: "Set LEGO Bouquet di girasoli",
      age: "18+",
      pieces: "686",
      rating: "5.0",
      price: 59.99,
      isNew: true,
    }),

    // Modello storico Ford Model T
    new Product({
      id: "ford-model-t",
      name: "Ford Model T",
      image: getProductImageUrl("ford-model-t.png"),
      alt: "Set LEGO Ford Model T",
      age: "18+",
      pieces: "1060",
      rating: "5.0",
      price: 129.99,
      isNew: true,
    }),

    // Set Pokémon Pikachu con Poké Ball
    new Product({
      id: "pikachu-ball",
      name: "Pikachu e Poké Ball",
      image: getProductImageUrl("pikachu-poke-ball.png"),
      alt: "Set LEGO Pikachu e Poké Ball",
      age: "18+",
      pieces: "2050",
      rating: "5.0",
      price: 199.99,
      isNew: true,
    }),

    // Set artistico LEGO Art - Monet
    new Product({
      id: "monet-ninfee",
      name: "Claude Monet – Lo stagno delle ninfee",
      image: getProductImageUrl("monet-ninfee.png"),
      alt: "Set LEGO Claude Monet Lo stagno delle ninfee",
      age: "18+",
      pieces: "3179",
      rating: "5.0",
      price: 199.99,
      isNew: true,
    }),

    // Trofeo ufficiale della Coppa del Mondo FIFA
    new Product({
      id: "trofeo-fifa",
      name: "Trofeo ufficiale Coppa del Mondo FIFA",
      image: getProductImageUrl("fifa-world-cup-trophy.png"),
      alt: "Set LEGO Trofeo Coppa del Mondo FIFA",
      age: "12+",
      pieces: "2842",
      rating: "5.0",
      price: 179.99,
      isNew: true,
    }),

    // Set personaggi Pixar
    new Product({
      id: "sulley-mike-boo",
      name: "Personaggi di Sulley, Mike e Boo",
      image: getProductImageUrl("sulley-mike-boo.png"),
      alt: "Set LEGO Personaggi di Sulley, Mike e Boo",
      age: "10+",
      pieces: "303",
      rating: null,
      price: 24.99,
      isNew: true,
    }),

    // Auto Formula 1 McLaren
    new Product({
      id: "mclaren-mcl39",
      name: "Auto McLaren MCL39 F1®",
      image: getProductImageUrl("mclaren-mcl39-f1.png"),
      alt: "Set LEGO Auto McLaren MCL39 F1",
      age: "18+",
      pieces: "1675",
      rating: null,
      price: 229.99,
      isNew: true,
    }),

    // Logo iconico di Batman
    new Product({
      id: "batman-logo",
      name: "Logo di Batman™",
      image: getProductImageUrl("batman-logo.png"),
      alt: "Set LEGO Logo di Batman",
      age: "12+",
      pieces: "678",
      rating: "4.8",
      price: 79.99,
      isNew: true,
    }),
  ],

  /**
   * Prodotti a tema Pasqua
   */
  pasqua: [
    // Personaggio Looney Tunes - Bugs Bunny
    new Product({
      id: "bugs-bunny",
      name: "Bugs Bunny",
      image: getProductImageUrl("bugs-bunny.png"),
      alt: "Set LEGO Bugs Bunny",
      age: "14+",
      pieces: "605",
      rating: "5.0",
      price: 29.99,
      isNew: true,
    }),

    // Decorazione primaverile
    new Product({
      id: "ghirlanda-primaverile",
      name: "Ghirlanda primaverile",
      image: getProductImageUrl("ghirlanda-primaverile.png"),
      alt: "Set LEGO Ghirlanda primaverile",
      age: "12+",
      pieces: "747",
      rating: null,
      price: 49.99,
      isNew: true,
    }),

    // Piccolo set a tema Pasqua
    new Product({
      id: "cestino-pasqua",
      name: "Cestino delle uova di Pasqua",
      image: getProductImageUrl("cestino-uova-pasqua.png"),
      alt: "Set LEGO Cestino delle uova di Pasqua",
      age: "7+",
      pieces: "216",
      rating: null,
      price: 14.99,
      isNew: true,
    }),

    // Riutilizzo dello stesso set presente in "inEvidenza" ma con id diverso
    new Product({
      id: "bouquet-girasoli-pasqua",
      name: "Bouquet di girasoli",
      image: getProductImageUrl("sunflower-bouquet.png"),
      alt: "Set LEGO Bouquet di girasoli",
      age: "18+",
      pieces: "686",
      rating: "5.0",
      price: 59.99,
      isNew: true,
    }),

    // Set decorativo con coniglio
    new Product({
      id: "adorabile-coniglio",
      name: "Adorabile Coniglio",
      image: getProductImageUrl("adorabile-coniglio.png"),
      alt: "Set LEGO Adorabile Coniglio",
      age: "8+",
      pieces: "326",
      rating: "5.0",
      price: 19.99,
      isNew: true,
    }),

    // Pokémon Eevee
    new Product({
      id: "eevee",
      name: "Eevee",
      image: getProductImageUrl("eevee-set.png"),
      alt: "Set LEGO Eevee",
      age: "18+",
      pieces: "587",
      rating: "5.0",
      price: 59.99,
      isNew: true,
    }),

    // Mech di Lloyd
    new Product({
      id: "mech-lloyd-15-anniversario",
      name: "Mech Titano di Lloyd – 15° anniversario",
      image: getProductImageUrl("mech-lloyd.png"),
      alt: "Set LEGO Mech Titano di Lloyd 15 anniversario",
      age: "14+",
      pieces: "1293",
      rating: null,
      price: 129.99,
      isNew: true,
    }),

    // Pallone da calcio decorativo
    new Product({
      id: "pallone-calcio",
      name: "Pallone da calcio",
      image: getProductImageUrl("soccer-ball.png"),
      alt: "Set LEGO Pallone da calcio",
      age: "10+",
      pieces: "1498",
      rating: "5.0",
      price: 119.99,
      isNew: true,
    }),

    // Fiori di ciliegio
    new Product({
      id: "fiori-ciliegio",
      name: "Fiori di ciliegio",
      image: getProductImageUrl("cherry-blossom.png"),
      alt: "Set LEGO Fiori di ciliegio",
      age: "8+",
      pieces: "430",
      rating: "5.0",
      price: 14.99,
      isNew: true,
    }),

    // Personaggi Pixar già presenti in evidenza
    new Product({
      id: "sulley-mike-boo-pasqua",
      name: "Personaggi di Sulley, Mike e Boo",
      image: getProductImageUrl("sulley-mike-boo.png"),
      alt: "Set LEGO Personaggi di Sulley, Mike e Boo",
      age: "10+",
      pieces: "303",
      rating: null,
      price: 24.99,
      isNew: true,
    }),
  ],
};
