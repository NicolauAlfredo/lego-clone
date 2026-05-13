// Modello prodotto
// Responsabilità: rappresentare un prodotto in modo consistente

export function Product({
  id,
  name,
  image,
  alt,
  age,
  pieces,
  rating = null,
  price,
  isNew = false,
  isFavorite = false,
}) {
  this.id = id;
  this.name = name;
  this.image = image;
  this.alt = alt;
  this.age = age;
  this.pieces = pieces;
  this.rating = rating;
  this.price = Number(price);
  this.isNew = isNew;
  this.isFavorite = isFavorite;
}
