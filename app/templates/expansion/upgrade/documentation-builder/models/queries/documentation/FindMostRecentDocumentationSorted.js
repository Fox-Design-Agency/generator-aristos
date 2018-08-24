const Documentation = require("../../documentation");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds the most recent documentation sorted in the Documentation collection.
 * @return {promise} A promise that resolves with the most recent sorted Documentation
 */
module.exports = () => {
  return Documentation.find({})
    .sort({ _id: -1 })
    .populate("category")
    .populate("author")
    .limit(1)
    .catch(err => {
      errorAddEvent(err, "documentation query error");
    });
};
