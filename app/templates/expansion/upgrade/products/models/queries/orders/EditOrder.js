const fs = require("fs-extra");
const Orders = fs.readJSONSync(
  "./expansion/upgrade/products/routes/checkers/productOrderModelRoutes.json"
).route;
const Order = require(Orders);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Edits a single order in the Order collection
 * @param {string} _id - The ID of the order to edit.
 * @param {object} orderProps - Object containing user, total, shipping, name, address, city, state, zip, status, items
 * @return {promise} A promise that resolves when the order is edited
 */
module.exports = (_id, orderProps) => {
  return Order.findByIdAndUpdate({ _id }, orderProps).catch(err => {
    errorAddEvent(err, "order query error");
  });
};