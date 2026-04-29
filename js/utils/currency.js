// Formatta un valore numerico in valuta euro (formato italiano)
// Esempio: 89.9 → "89,90 €"
export function formatCurrency(value) {
  return `${value.toFixed(2).replace(".", ",")} €`;
}