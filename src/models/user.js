const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, required: true, default: false },
  averageRating: { type: Number, default: 0 },
  reviews: [reviewSchema],
});

const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;
