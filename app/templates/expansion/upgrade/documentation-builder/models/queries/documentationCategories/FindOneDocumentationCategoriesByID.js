const DocumentationCategories = require("../../documentationCategory");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds a single documentqation category in the Documentation Category collection.
 * @param {objectID} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the documentation category that matches the id
 */
module.exports = _id => {
  return DocumentationCategories.findById(_id).catch(err => {
    errorAddEvent(err, "documentation category query error");
  });
};