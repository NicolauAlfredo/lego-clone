// Import del modello Product, che rappresenta un singolo set LEGO
import { Product } from "../models/Product.js";

// Percorso base delle immagini dei prodotti della homepage
const BASE_IMAGE_PATH = "./assets/pages/home/images/";

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
      image: `${BASE_IMAGE_PATH}ferrari-f2004-schumacher.png`,
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
      image: `${BASE_IMAGE_PATH}magnolia-branches.png`,
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
      image: `${BASE_IMAGE_PATH}sunflower-bouquet.png`,
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
      image: `${BASE_IMAGE_PATH}ford-model-t.png`,
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
      image: `${BASE_IMAGE_PATH}pikachu-poke-ball.png`,
      alt: "Set LEGO Pikachu e Poké Ball",
      age: "18+",
      pieces: "2050",
      rating: "5.0",
      price: 199.99,
      isNew: true,
    }),

    /**
     * Nuovi prodotti aggiunti alla sezione "inEvidenza"
     */

    // Set artistico LEGO Art - Monet (quadro decorativo)
    new Product({
      id: "monet-ninfee",
      name: "Claude Monet – Lo stagno delle ninfee",
      image: `${BASE_IMAGE_PATH}monet-ninfee.png`,
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
      image: `${BASE_IMAGE_PATH}fifa-world-cup-trophy.png`,
      alt: "Set LEGO Trofeo Coppa del Mondo FIFA",
      age: "12+",
      pieces: "2842",
      rating: "5.0",
      price: 179.99,
      isNew: true,
    }),

    // Set personaggi Pixar (Monsters & Co.)
    new Product({
      id: "sulley-mike-boo",
      name: "Personaggi di Sulley, Mike e Boo",
      image: `${BASE_IMAGE_PATH}sulley-mike-boo.png`,
      alt: "Set LEGO Personaggi di Sulley, Mike e Boo",
      age: "10+",
      pieces: "303",
      rating: null, // Nessuna valutazione disponibile
      price: 24.99,
      isNew: true,
    }),

    // Auto Formula 1 McLaren
    new Product({
      id: "mclaren-mcl39",
      name: "Auto McLaren MCL39 F1®",
      image: `${BASE_IMAGE_PATH}mclaren-mcl39-f1.png`,
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
      image: `${BASE_IMAGE_PATH}batman-logo.png`,
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
      image: `${BASE_IMAGE_PATH}bugs-bunny.png`,
      alt: "Set LEGO Bugs Bunny",
      age: "14+",
      pieces: "605",
      rating: "5.0",
      price: 29.99,
      isNew: true,
    }),

    // Decorazione primaverile (ghirlanda)
    new Product({
      id: "ghirlanda-primaverile",
      name: "Ghirlanda primaverile",
      image: `${BASE_IMAGE_PATH}ghirlanda-primaverile.png`,
      alt: "Set LEGO Ghirlanda primaverile",
      age: "12+",
      pieces: "747",
      rating: null,
      price: 49.99,
      isNew: true,
    }),

    // Piccolo set a tema Pasqua (cestino uova)
    new Product({
      id: "cestino-pasqua",
      name: "Cestino delle uova di Pasqua",
      image: `${BASE_IMAGE_PATH}cestino-uova-pasqua.png`,
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
      image: `${BASE_IMAGE_PATH}sunflower-bouquet.png`,
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
      image: `${BASE_IMAGE_PATH}adorabile-coniglio.png`,
      alt: "Set LEGO Adorabile Coniglio",
      age: "8+",
      pieces: "326",
      rating: "5.0",
      price: 19.99,
      isNew: true,
    }),
  ],
};
