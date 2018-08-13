const DocumentationCategories = require("../../documentationCategory");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Edits a single documentation category in the Documentation Category collection
 * @param {objectID} _id - The ID of the documentation category to edit.
 * @param {object} docCatsProps - Object containing title, slug, description, keywords, author
 * @return {promise} A promise that resolves when the documentation category is edited
 */
module.exports = (_id, docCatsProps) => {
  return DocumentationCategories.findByIdAndUpdate({ _id }, docCatsProps).catch(
    err => {
      errorAddEvent(err, "documentation category query error");
    }
  );
};

