const DocumentationCategories = require("../../documentationCategory");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the sort documentation categories in the Documentation Category collection.
 * @return {promise} A promise that resolves with all the sorted documentation categories
 */
module.exports = () => {
  return DocumentationCategories.find({})
    .sort({ sorting: 1 })
    .catch(err => {
      errorAddEvent(err, "documentation category query error");
    });
};