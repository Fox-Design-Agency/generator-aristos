const Documentation = require("../../documentation");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * counts the documentations in the Documentation collection.
 * @return {promise} A promise that resolves with count of the documentations
 */
module.exports = () => {
  return Documentation.estimatedDocumentCount({})
    .then(c => {
      return c;
    })
    .catch(err => {
      errorAddEvent(err, "documentation query error");
    });
};


