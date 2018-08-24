const Documentation = require("../../documentation");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the sorted documentation in the Documentation collection.
 * @return {promise} A promise that resolves with all the documentation
 */
module.exports = () => {
  return Documentation.find({})
    .sort({ sorting: 1 })
    .populate("category")
    .populate("author")
    .catch(err => {
      errorAddEvent(err, "documentation query error");
    });
};
