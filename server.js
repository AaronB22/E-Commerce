const express = require('express');
const routes = require('./routes');
const sequelize= require('./config/connection')


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
const Category= require(`./models/Category`)
const Product= require(`./models/Product`)
const ProductTag= require(`./models/ProductTag`)
const Tags= require(`./models/Tag`)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
