const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: { type: String, require: true },
  rating: Number,
  description: { type: String, require: true },
  price: { type: Number, require: true },
  image: String,
  stock: Number,
  colors: Array,
  sizes: Array,
});

const Product = model("Product", productSchema);

module.exports = {
  Product,
};
