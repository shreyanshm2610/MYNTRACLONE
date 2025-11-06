// backend/models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  price: Number,
  description: String,
  images: [String] // optional - can be empty; frontend uses local images fallback
});

module.exports = mongoose.model("Product", productSchema);
