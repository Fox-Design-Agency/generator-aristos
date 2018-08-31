const fs = require("fs-extra");
const Changelogs = fs.readJSONSync(
  "./expansion/upgrade/documentation-builder/routes/checkers/changelogModelRoutes.json"
).route;
const Changelog = require(Changelogs);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all changelogs matchings param in the Changelog collection.
 * @param {object} stuff - An object containing the stuff to search for.
 * @return {promise} A promise that resolves with the changelog thta matches the stuff param
 */
module.exports = stuff => {
  return Changelog.find(stuff)
    .populate("category")
    .populate("author")
    .catch(err => {
      errorAddEvent(err, "changelog query error");
    });
};