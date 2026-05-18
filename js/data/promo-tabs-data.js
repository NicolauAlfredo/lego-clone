import { getProductImageUrl } from "./perfect-set-products.js";

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
      image: getProductImageUrl("all-new-sets.jpg"),
    }),
    // Set esclusivi category
    new PromoTabCard({
      id: "Set esclusivi",
      name: "Set esclusivi",
      image: getProductImageUrl("exclusive-sets.jpg"),
    }),
    // Offerte category
    new PromoTabCard({
      id: "Offerte",
      name: "Offerte",
      image: getProductImageUrl("offers.jpg"),
    }),
    // Pokemon category
    new PromoTabCard({
      id: "Pokemon",
      name: "Pokemon",
      image: getProductImageUrl("pokemon.png"),
    }),
    // Lego editions category
    new PromoTabCard({
      id: "Editions",
      name: "LEGO® Editions",
      image: getProductImageUrl("star-wars.jpeg"),
    }),
    // Festa papà category
    new PromoTabCard({
      id: "Festa del papà",
      name: "Festa del papà",
      image: getProductImageUrl("fathers-day.jpg"),
    }),
    // Doppi punti category
    new PromoTabCard({
      id: "Doppi punti",
      name: "Il doppio dei punti fedeltà",
      image: getProductImageUrl("double-points.png"),
    }),
    // One piece category
    new PromoTabCard({
      id: "One Piece",
      name: "LEGO® ONE PIECE",
      image: getProductImageUrl("one-piece.jpg"),
    }),
  ],

  // TAB REGALI
  Regali: [
    // Tutti i set category
    new PromoTabCard({
      id: "Tutti i set",
      name: "Tutti i set",
      image: getProductImageUrl("all-sets.jpg"),
    }),
    // Acquista per prezzo category
    new PromoTabCard({
      id: "Acquista per prezzo",
      name: "Acquista per prezzo",
      image: getProductImageUrl("shopByPrice.jpg"),
    }),
    // Buoni Regalo category
    new PromoTabCard({
      id: "Buoni Regalo",
      name: "Buoni Regalo",
      image: getProductImageUrl("buoni-regalo.jpg"),
    }),
    // 9 anni e oltre category
    new PromoTabCard({
      id: "9 anni e oltre",
      name: "9 anni e oltre",
      image: getProductImageUrl("9-age-plus_.jpg"),
    }),
    // Set di piccole dimensioni category
    new PromoTabCard({
      id: "Set di piccole dimensioni",
      name: "Set di piccole dimensioni",
      image: getProductImageUrl("SmallSets.jpg"),
    }),
    // Merchandising category
    new PromoTabCard({
      id: "Merchandising",
      name: "Merchandising",
      image: getProductImageUrl("Merchandise.jpg"),
    }),
    // Acquista per età category
    new PromoTabCard({
      id: "Acquista per eta",
      name: "Acquista per età",
      image: getProductImageUrl("buyForAge.jpg"),
    }),
    // Ottieni premi category
    new PromoTabCard({
      id: "Ottieni premi",
      name: "Ottieni premi",
      image: getProductImageUrl("getPrizes.jpg"),
    }),
  ],

  // TAB TEMI
  Temi: [
    // Art category
    new PromoTabCard({
      id: "Art",
      name: "Art",
      image: getProductImageUrl("Art.jpg"),
    }),
    // LEGO® BrickHeadz™ category
    new PromoTabCard({
      id: "BrickHeadz",
      name: "LEGO® BrickHeadz™",
      image: getProductImageUrl("Brickheadz.jpg"),
    }),
    // Harry Potter™ category
    new PromoTabCard({
      id: "HarryPotter",
      name: "Harry Potter™",
      image: getProductImageUrl("HarryPotter.jpg"),
    }),
    // Ninjago category
    new PromoTabCard({
      id: "Ninjago",
      name: "NINJAGO®",
      image: getProductImageUrl("ninjago.png"),
    }),
    // Speed Champions category
    new PromoTabCard({
      id: "Speed Champions",
      name: "Speed Champions",
      image: getProductImageUrl("speed-champion.png"),
    }),
    // Classic category
    new PromoTabCard({
      id: "Classic",
      name: "Classic",
      image: getProductImageUrl("Classic.jpg"),
    }),
    // Botanicals category
    new PromoTabCard({
      id: "Botanicals",
      name: "Botanicals",
      image: getProductImageUrl("Botanicals.jpg"),
    }),
    // Tutti i temi category
    new PromoTabCard({
      id: "Tutti i temi",
      name: "Tutti i temi",
      image: getProductImageUrl("see_all.png"),
    }),
  ],
};
