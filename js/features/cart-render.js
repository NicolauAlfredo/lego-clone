import { Cart } from "../models/Cart.js";
import { perfectSetProducts, BASE_IMAGE_PATH } from "../data/perfect-set-products.js";
import { Product } from "../models/Product.js";
import { formatCurrency } from "../utils/currency.js";
import { carrello, updateCartCounter } from "./cart-ui.js";


const cartProducts = document.getElementsByClassName(".cart-container");

let test = {
    id: "ferrari-f2004-schumacher",
    name: "Ferrari F2004 e Michael Schumacher",
    image: "/assets/pages/home/images/ferrari-f2004-schumacher.png",
    price: 89.99,
};


// cartProducts.innerHTML = `
//             <div class= "cart-product-card-container">
//               <img class= "cart-product-img" src="${test.image}" alt="${test.id}">
//               <p class= "cart-product-name">${test.name}</p>
//               <p class= "cart-product-price">${test.price} €</p>
//             </div>
//             `;


carrello.products.forEach(e => {
    cartProducts.innerHTML += 
    `
        <div class= "cart-product-card-container">
              <img class= "cart-product-img" src="${carrello.e.image}" alt="${e.id}">
              <p class= "cart-product-name">${carrello.e.name}</p>
              <p class= "cart-product-price">${carrello.e.price} €</p>
            </div>
    `
});

