import { BASE_IMAGE_PATH } from "./perfect-set-products.js";


function createTabs({
    id,
    name,
    image,
}) {
  this.id = id;
  this.name = name;
  this.image = image;
}

export const tabsCategories = {

    // TAB NOVITA'
    Novita: [
        // Tutti i nuovi set category
        new createTabs({
            id : "Tutti i nuovi set",
            name : "Tutti i nuovi set",
            image : `${BASE_IMAGE_PATH}all-new-sets.jpg`,
}),
         // Set esclusivi category
        new createTabs({
            id : "Set esclusivi",
            name : "Set esclusivi",
            image : `${BASE_IMAGE_PATH}exclusive-sets.jpg`,
}),
        // Offerte category
                new createTabs({
                    id : "Offerte",
                    name : "Offerte",
                    image : `${BASE_IMAGE_PATH}offers.jpg`,
        }),
        // Pokemon category
                new createTabs({
                    id : "Pokemon",
                    name : "Pokemon",
                    image : `${BASE_IMAGE_PATH}pokemon.png`,
        }),
        // Lego editions category
                new createTabs({
                    id : "Editions",
                    name : "LEGO® Editions",
                    image : `${BASE_IMAGE_PATH}star-wars.jpeg`,
        }),
        // Festa papà category
                new createTabs({
                    id : "Festa del papà",
                    name : "Festa del papà",
                    image : `${BASE_IMAGE_PATH}fathers-day.jpg`,
        }),
        // Doppi punti category
                new createTabs({
                    id : "Doppi punti",
                    name : "Il doppio dei punti fedeltà",
                    image : `${BASE_IMAGE_PATH}double-points.png`,
        }),
        // One piece category
                new createTabs({
                    id : "One Piece",
                    name : "LEGO® ONE PIECE",
                    image : `${BASE_IMAGE_PATH}one-piece.jpg`,
        }),
    ],

    // TAB REGALI
    Regali: [
        // Tutti i set category
        new createTabs({
            id : "Tutti i set",
            name : "Tutti i set",
            image : `${BASE_IMAGE_PATH}all-sets.jpg`,
}),
         // Acquista per prezzo category
        new createTabs({
            id : "Acquista per prezzo",
            name : "Acquista per prezzo",
            image : `${BASE_IMAGE_PATH}shopByPrice.jpg`,
}),
        // Buoni Regalo category
                new createTabs({
                    id : "Buoni Regalo",
                    name : "Buoni Regalo",
                    image : `${BASE_IMAGE_PATH}buoni-regalo.jpg`,
        }),
        // 9 anni e oltre category
                new createTabs({
                    id : "9 anni e oltre",
                    name : "9 anni e oltre",
                    image : `${BASE_IMAGE_PATH}9-age-plus_.jpg`,
        }),
        // Set di piccole dimensioni category
                new createTabs({
                    id : "Set di piccole dimensioni",
                    name : "Set di piccole dimensioni",
                    image : `${BASE_IMAGE_PATH}SmallSets.jpg`,
        }),
        // Merchandising category
                new createTabs({
                    id : "Merchandising",
                    name : "Merchandising",
                    image : `${BASE_IMAGE_PATH}Merchandise.jpg`,
        }),
        // Acquista per età category
                new createTabs({
                    id : "Acquista per eta",
                    name : "Acquista per età",
                    image : `${BASE_IMAGE_PATH}buyForAge.jpg`,
        }),
        // Ottieni premi category
                new createTabs({
                    id : "Ottieni premi",
                    name : "Ottieni premi",
                    image : `${BASE_IMAGE_PATH}getPrizes.jpg`,
        }),
    ],

    // TAB TEMI
    Temi: [
        // Art category
        new createTabs({
            id : "Art",
            name : "Art",
            image : `${BASE_IMAGE_PATH}Art.jpg`,
}),
         // LEGO® BrickHeadz™ category
        new createTabs({
            id : "BrickHeadz",
            name : "LEGO® BrickHeadz™",
            image : `${BASE_IMAGE_PATH}Brickheadz.jpg`,
}),
        // Harry Potter™ category
                new createTabs({
                    id : "HarryPotter",
                    name : "Harry Potter™",
                    image : `${BASE_IMAGE_PATH}HarryPotter.jpg`,
        }),
        // Ninjago category
                new createTabs({
                    id : "Ninjago",
                    name : "NINJAGO®",
                    image : `${BASE_IMAGE_PATH}ninjago.png`,
        }),
        // Speed Champions category
                new createTabs({
                    id : "Speed Champions",
                    name : "Speed Champions",
                    image : `${BASE_IMAGE_PATH}speed-champion.png`,
        }),
        // Classic category
                new createTabs({
                    id : "Classic",
                    name : "Classic",
                    image : `${BASE_IMAGE_PATH}Classic.jpg`,
        }),
        // Botanicals category
                new createTabs({
                    id : "Botanicals",
                    name : "Botanicals",
                    image : `${BASE_IMAGE_PATH}Botanicals.jpg`,
        }),
        // Tutti i temi category
                new createTabs({
                    id : "Tutti i temi",
                    name : "Tutti i temi",
                    image : `${BASE_IMAGE_PATH}see_all.png`,
        }),
    ],
}