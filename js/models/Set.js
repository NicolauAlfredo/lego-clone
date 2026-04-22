let perfectSet = []

function cardProduct(id, linkImage, age, blocks, price, rating, favorite){
    this.name = id;
    this.linkImage= linkImage
    this.age = age;
    this.blocks = blocks;
    this.price = price;
    this.rating = rating;
    this.favorite = favorite;
    this.showArray = perfectSet.push(this.name, this.linkImage, this.age, this.blocks, this.price, this.rating, this.favorite)
};

perfectSet = new cardProduct ("f2004", "/assets/pages/home/images/ferrari-f2004-schumacher.png", 18, 735, 89.99, 5, false)
console.log(typeof(perfectSet), perfectSet)