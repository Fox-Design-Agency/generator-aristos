const fs = require("fs-extra");
const Products = fs.readJSONSync(
  "./expansion/upgrade/products/routes/checkers/productModelRoutes.json"
).route;
const Product = require(Products);
/* Aristos Logger Path */
// const Logger = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger").Logger;

/**
 * Finds a single page in the Page collection.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the page that matches the id
 */
module.exports = stuff => {
  return Product.find(stuff).sort({ sorting: 1 });
};