require("dotenv").config();
const { Product } = require("./models/Product");

const express = require("express");
const { mongoose } = require("mongoose");
const app = express();

const PORT = process.env.PORT || 3002;

require("./mongo");

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

app.post("/", (req, res) => {
  const newProduct = new Product({
    name: "Remera Henry",
    description: "Remera manga corta",
    price: 1200,
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.soyhenry.com%2F&psig=AOvVaw1rrGfsf3XyS4Pn1B7OlSxI&ust=1667998153101000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCICKtL3PnvsCFQAAAAAdAAAAABAD",
    rating: 5,
    stock: 10,
    colors: ["white", "black"],
    sizes: ["XL", "M"],
  });
  newProduct
    .save()
    .then((resultado) => {
      res.status(200).send(resultado);
      mongoose.connection.close();
    })
    .catch((error) => console.log(error));
});
