const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  username: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
});

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  seller: { type: String, required: true },
  image: { type: String, required: true },
  size: { type: String },
  colour: { type: String },
  spec: { type: String },
  rating: { type: Number, default: 0 },
  reviews: [reviewSchema],
  category: { type: String, required: true },
});

const Item = mongoose.model('Item', itemSchema, 'Items');


module.exports = Item;
