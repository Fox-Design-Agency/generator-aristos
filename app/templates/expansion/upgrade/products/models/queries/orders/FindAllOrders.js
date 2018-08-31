const fs = require("fs-extra");
const Orders = fs.readJSONSync(
  "./expansion/upgrade/products/routes/checkers/productOrderModelRoutes.json"
).route;
const Order = require(Orders);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the orders in the Order collection.
 * @return {promise} A promise that resolves with all the orders
 */
module.exports = () => {
  return Order.find({}).catch(err => {
    errorAddEvent(err, "order query error");
  });
};