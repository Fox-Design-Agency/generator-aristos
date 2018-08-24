const Changelog = require("../../changelog");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the changelogs sorted in the Changelog collection.
 * @param {object} stuff - The object containing the stuff to find.
 * @return {promise} A promise that resolves with all the sorted changelogs
 */
module.exports = stuff => {
  return Changelog.find(stuff)
    .sort({ sorting: 1 })
    .populate("category")
    .populate("author")
    .catch(err => {
      errorAddEvent(err, "changelog query error");
    });
};
