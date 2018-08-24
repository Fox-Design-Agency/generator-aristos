const Changelog = require("../../changelog");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the changelogs in the Changelog collection.
 * @return {promise} A promise that resolves with all the changwelogs
 */
module.exports = () => {
  return Changelog.find({})
    .populate("category")
    .populate("author")
    .catch(err => {
      errorAddEvent(err, "changelog query error");
    });
};
