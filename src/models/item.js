class Item {
  constructor(name, description, price, currency, seller, image, size, colour, spec, rating, reviews, category) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.currency = currency;
    this.seller = seller;
    this.image = image;
    this.size = size;
    this.colour = colour;
    this.spec = spec;
    this.rating = rating || 0;
    this.reviews = reviews || [];
    this.category = category;
  }
}

module.exports = Item;
