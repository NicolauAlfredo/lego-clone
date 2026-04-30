// Funzione per attivare/disattivare lo stato "preferito" di un prodotto
// Gestisce anche il caso in cui l'array o l'id non siano validi

export function toggleFavorite(products, id) {
  // Validazione base dei parametri
  if (!Array.isArray(products) || !id) {
    console.warn("Parametri non validi:", { products, id });
    return;
  }

  // Ricerca del prodotto tramite id
  const product = products.find((p) => p.id === id);

  // Se il prodotto non viene trovato, usciamo
  if (!product) {
    console.warn("Prodotto non trovato:", id);
    return;
  }

  // Toggle dello stato preferito
  product.isFavorite = !product.isFavorite;
}