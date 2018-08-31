const fs = require("fs-extra");
const Documentations = fs.readJSONSync(
  "./expansion/upgrade/documentation-builder/routes/checkers/documentationModelRoutes.json"
).route;
const Documentation = require(Documentations);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Edits a single documentation in the Documentation collection
 * @param {objectID} _id - The ID of the documentation to edit.
 * @param {object} documentationProps - Object containing title, slug, content, description, keywords, author, image
 * @return {promise} A promise that resolves when the documentation is edited
 */
module.exports = (_id, documentationProps) => {
  return Documentation.findByIdAndUpdate({ _id }, documentationProps).catch(err => {
    errorAddEvent(err, "documentation query error");
  });
};
