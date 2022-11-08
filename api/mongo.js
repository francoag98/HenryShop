require("dotenv").config();

const mongoose = require("mongoose");
const password = process.env.DB_PASSWORD;

const connectionString = `mongodb+srv://admin:${password}@cluster0.qjjhpjf.mongodb.net/HenryShop?retryWrites=true&w=majority`;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.error(err));
