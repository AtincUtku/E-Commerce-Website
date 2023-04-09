const { ObjectID } = require('mongodb');
const Review = require('./review');

class Item {
  constructor(name, description, price, currency, seller, image, size, colour, spec, rating, reviews = [], category) {
    this._id = new ObjectID();
    this.name = name;
    this.description = description;
    this.price = price;
    this.currency = currency;
    this.price = price;
    this.seller = seller;
    this.image = image;
    this.size = size;
    this.colour = colour;
    this.spec = spec;
    this.rating = rating;
    this.reviews = reviews ? reviews.map((r) => new Review(r.username, r.content, r.rating)) : [];
    this.category = category;
  }

  addReview(username, content, rating) {
    const review = new Review(username, content, rating);
    this.reviews.push(review);
  }

  removeReview(review) {
    const index = this.reviews.indexOf(review);
    if (index !== -1) {
      this.reviews.splice(index, 1);
    }
  }

  updateReview(review, username, rating, comment) {
    review.username = username;
    review.rating = rating;
    review.comment = comment;
  }


}

module.exports = Item;
