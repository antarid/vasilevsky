const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  text: String,
  userId: String,
  date: String,
  stars: Number
});

const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  image: String,
  quantity: Number,
  price: Number,
  reviewIds: [String]
});

const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  password: String,
  productIds: [String]
});

const cardSchema = new mongoose.Schema({
  number: Number,
  cvv: Number,
  month: Number,
  year: Number,
  holder: String,
  money: Number
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Card = mongoose.model('Card', cardSchema);
const Review = mongoose.model('Review', reviewSchema);

module.exports = {
  User,
  Product,
  Card,
  Review
};
