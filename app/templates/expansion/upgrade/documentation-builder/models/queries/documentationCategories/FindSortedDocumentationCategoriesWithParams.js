const DocumentationCategories = require("../../documentationCategory");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds the sorted documentation categories by params in the Documentation categories collection.
 * @param {string} stuff - The object of the stuff to sort by.
 * @return {promise} A promise that resolves with the sorted documentation categories
 */
module.exports = stuff => {
  return DocumentationCategories.find(stuff)
    .sort({ sorting: 1 })
    .catch(err => {
      errorAddEvent(err, "documentation category query error");
    });
};