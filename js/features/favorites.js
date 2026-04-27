export function togglePreferito(id) {
  for (let i = 0; i < CardProduct.length; i++) {
    if (CardProduct[i].id === id) {
      CardProduct[i].favorite = !CardProduct[i].favorite;
      break;
    }
  }
}
