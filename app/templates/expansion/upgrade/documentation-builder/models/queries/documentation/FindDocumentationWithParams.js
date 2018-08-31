const fs = require("fs-extra");
const Documentations = fs.readJSONSync(
  "./expansion/upgrade/documentation-builder/routes/checkers/documentationModelRoutes.json"
).route;
const Documentation = require(Documentations);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds documentation with the stuff param in the Documentation collection.
 * @param {object} stuff - The Iobject of the stuff to find.
 * @return {promise} A promise that resolves with all the documentation that matches the stuff param
 */
module.exports = stuff => {
  return Documentation.find(stuff)
  .populate("category")
  .populate("author")
    .catch(err => {
      errorAddEvent(err, "documentation query error");
    });
};