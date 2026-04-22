let perfectSet = []

function cardProduct(id, linkImage, age, blocks, price, rating, favorite){
    this.id = id;
    this.linkImage= linkImage
    this.age = age;
    this.blocks = blocks;
    this.price = price;
    this.rating = rating;
    this.favorite = favorite;
};
// ESEMPIO
//perfectSet = new cardProduct ("f2004", "../../../assets/pages/home/images/ferrari-f2004-schumacher.png", 18, 735, 89.99, 5, false)
// console.log(typeof(perfectSet), perfectSet) 
