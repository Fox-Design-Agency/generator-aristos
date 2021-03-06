const fs = require("fs-extra");
const Changelogs = fs.readJSONSync(
  "./expansion/upgrade/documentation-builder/routes/checkers/changelogModelRoutes.json"
).route;
const Changelog = require(Changelogs);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Find the most recent changelog in the Changelog collection.
 * @return {promise} A promise that resolves with the msot recent changelog
 */
module.exports = () => {
  return Changelog.find({})
    .sort({ _id: -1 })
    .populate("category")
    .populate("author")
    .limit(1)
    .catch(err => {
      errorAddEvent(err, "changelog query error");
    });
};