const Changelog = require("../../changelog");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Counts the logs in the Changelog collection.
 * @return {promise} A promise that resolves with the counted changelogs
 */
module.exports = () => {
  return Changelog.estimatedDocumentCount({})
    .then(c => {
      return c;
    })
    .catch(err => {
      errorAddEvent(err, "changelog query error");
    });
};


