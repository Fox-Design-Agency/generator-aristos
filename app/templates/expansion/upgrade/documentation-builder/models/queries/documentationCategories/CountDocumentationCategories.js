const DocumentationCategories = require("../../documentationCategory");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * counts the documentation categories in the Documentation Category collection.
 * @return {promise} A promise that resolves with the count
 */
module.exports = () => {
  return DocumentationCategories.estimatedDocumentCount({})
    .then(c => {
      return c;
    })
    .catch(err => {
      errorAddEvent(err, "documentation category query error");
    });
};