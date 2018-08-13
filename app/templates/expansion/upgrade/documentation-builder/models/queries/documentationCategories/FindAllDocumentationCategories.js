const DocumentationCategories = require("../../documentationCategory");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger").addError;
/**
 * Finds all the documentation categories in the Documentation Category collection.
 * @return {promise} A promise that resolves with all the documentation categories
 */
module.exports = () => {
  return DocumentationCategories.find({}).catch(err => {
    errorAddEvent(err, "documentation category query error");
  });
};

