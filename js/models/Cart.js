import { cardProduct } from './set.js'
export function Carrello() {
    this.prodotti = [];
    this.aggiungiSet = function(prodotto) {
        this.prodotti.push(prodotto)
    }
    this.calcolaNumeroSet = function(){
        return this.prodotti.length
    }
    this.calcolaTotale = function(){
       return this.prodotti.reduce((a, totale) => a + totale.price, 0)
       
    }
}