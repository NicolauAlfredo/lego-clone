// Formatta un valore numerico in valuta euro (formato italiano)
// Esempio: 89.9 → "89,90 €"
export function formatCurrency(value) {
  // Case decimale (quantitÀ di numero dopo la virgola = toFixed(2) 2 = alla quantità di numeri dopo la virgula)
  return `${value.toFixed(2).replace(".", ",")} €`;
}