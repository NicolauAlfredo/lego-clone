// Formatta un valore numerico in valuta euro (formato italiano)
// Esempio: 89.9 → "89,90 €"

export function formatCurrency(value) {
  // Converte il valore in numero
  const numberValue = Number(value);

  // Controlla se il valore è valido
  if (Number.isNaN(numberValue)) {
    console.warn("Valore non valido per formatCurrency:", value);

    return "0,00 €";
  }

  // Formatta il numero in stile italiano
  return `${numberValue.toFixed(2).replace(".", ",")} €`;
}