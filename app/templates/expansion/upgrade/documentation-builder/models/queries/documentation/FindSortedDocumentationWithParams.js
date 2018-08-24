const Documentation = require("../../documentation");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all sorted documentation sorted with params in the Documentation collection.
 * @param {object} stuff - The object containing the stuff to sort by
 * @return {promise} A promise that resolves with the sorted documentation
 */
module.exports = stuff => {
  return Documentation.find(stuff)
    .populate("category")
    .populate("author")
    .sort({ sorting: 1 })
    .catch(err => {
      errorAddEvent(err, "documentation query error");
    });
};
