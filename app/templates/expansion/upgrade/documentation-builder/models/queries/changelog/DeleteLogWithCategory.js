const fs = require("fs-extra");
const Changelogs = fs.readJSONSync(
  "./expansion/upgrade/documentation-builder/routes/checkers/changelogModelRoutes.json"
).route;
const Changelog = require(Changelogs);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Deletes a single changelog from the Changelog collection
 * @param {objectID} _id - The ID of the changelog to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = _id => {
  return Changelog.remove({ category: _id }).catch(err => {
    errorAddEvent(err, "changelog query error");
  });
};