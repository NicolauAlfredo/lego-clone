import { BASE_IMAGE_PATH } from "./perfect-set-products.js";

function PromoTabCard({ id, name, image }) {
  this.id = id;
  this.name = name;
  this.image = image;
}

export const tabsCategories = {
  // TAB NOVITA'
  Novita: [
    // Tutti i nuovi set category
    new PromoTabCard({
      id: "Tutti i nuovi set",
      name: "Tutti i nuovi set",
      image: `${BASE_IMAGE_PATH}all-new-sets.jpg`,
    }),
    // Set esclusivi category
    new PromoTabCard({
      id: "Set esclusivi",
      name: "Set esclusivi",
      image: `${BASE_IMAGE_PATH}exclusive-sets.jpg`,
    }),
    // Offerte category
    new PromoTabCard({
      id: "Offerte",
      name: "Offerte",
      image: `${BASE_IMAGE_PATH}offers.jpg`,
    }),
    // Pokemon category
    new PromoTabCard({
      id: "Pokemon",
      name: "Pokemon",
      image: `${BASE_IMAGE_PATH}pokemon.png`,
    }),
    // Lego editions category
    new PromoTabCard({
      id: "Editions",
      name: "LEGO® Editions",
      image: `${BASE_IMAGE_PATH}star-wars.jpeg`,
    }),
    // Festa papà category
    new PromoTabCard({
      id: "Festa del papà",
      name: "Festa del papà",
      image: `${BASE_IMAGE_PATH}fathers-day.jpg`,
    }),
    // Doppi punti category
    new PromoTabCard({
      id: "Doppi punti",
      name: "Il doppio dei punti fedeltà",
      image: `${BASE_IMAGE_PATH}double-points.png`,
    }),
    // One piece category
    new PromoTabCard({
      id: "One Piece",
      name: "LEGO® ONE PIECE",
      image: `${BASE_IMAGE_PATH}one-piece.jpg`,
    }),
  ],

  // TAB REGALI
  Regali: [
    // Tutti i set category
    new PromoTabCard({
      id: "Tutti i set",
      name: "Tutti i set",
      image: `${BASE_IMAGE_PATH}all-sets.jpg`,
    }),
    // Acquista per prezzo category
    new PromoTabCard({
      id: "Acquista per prezzo",
      name: "Acquista per prezzo",
      image: `${BASE_IMAGE_PATH}shopByPrice.jpg`,
    }),
    // Buoni Regalo category
    new PromoTabCard({
      id: "Buoni Regalo",
      name: "Buoni Regalo",
      image: `${BASE_IMAGE_PATH}buoni-regalo.jpg`,
    }),
    // 9 anni e oltre category
    new PromoTabCard({
      id: "9 anni e oltre",
      name: "9 anni e oltre",
      image: `${BASE_IMAGE_PATH}9-age-plus_.jpg`,
    }),
    // Set di piccole dimensioni category
    new PromoTabCard({
      id: "Set di piccole dimensioni",
      name: "Set di piccole dimensioni",
      image: `${BASE_IMAGE_PATH}SmallSets.jpg`,
    }),
    // Merchandising category
    new PromoTabCard({
      id: "Merchandising",
      name: "Merchandising",
      image: `${BASE_IMAGE_PATH}Merchandise.jpg`,
    }),
    // Acquista per età category
    new PromoTabCard({
      id: "Acquista per eta",
      name: "Acquista per età",
      image: `${BASE_IMAGE_PATH}buyForAge.jpg`,
    }),
    // Ottieni premi category
    new PromoTabCard({
      id: "Ottieni premi",
      name: "Ottieni premi",
      image: `${BASE_IMAGE_PATH}getPrizes.jpg`,
    }),
  ],

  // TAB TEMI
  Temi: [
    // Art category
    new PromoTabCard({
      id: "Art",
      name: "Art",
      image: `${BASE_IMAGE_PATH}Art.jpg`,
    }),
    // LEGO® BrickHeadz™ category
    new PromoTabCard({
      id: "BrickHeadz",
      name: "LEGO® BrickHeadz™",
      image: `${BASE_IMAGE_PATH}Brickheadz.jpg`,
    }),
    // Harry Potter™ category
    new PromoTabCard({
      id: "HarryPotter",
      name: "Harry Potter™",
      image: `${BASE_IMAGE_PATH}HarryPotter.jpg`,
    }),
    // Ninjago category
    new PromoTabCard({
      id: "Ninjago",
      name: "NINJAGO®",
      image: `${BASE_IMAGE_PATH}ninjago.png`,
    }),
    // Speed Champions category
    new PromoTabCard({
      id: "Speed Champions",
      name: "Speed Champions",
      image: `${BASE_IMAGE_PATH}speed-champion.png`,
    }),
    // Classic category
    new PromoTabCard({
      id: "Classic",
      name: "Classic",
      image: `${BASE_IMAGE_PATH}Classic.jpg`,
    }),
    // Botanicals category
    new PromoTabCard({
      id: "Botanicals",
      name: "Botanicals",
      image: `${BASE_IMAGE_PATH}Botanicals.jpg`,
    }),
    // Tutti i temi category
    new PromoTabCard({
      id: "Tutti i temi",
      name: "Tutti i temi",
      image: `${BASE_IMAGE_PATH}see_all.png`,
    }),
  ],
};
