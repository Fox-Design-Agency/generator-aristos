const Documentation = require("../../documentation");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Deletes a single documentation from the Documentation collection
 * @param {objectID} _id - The ID of the page to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = _id => {
  return Documentation.remove({category:_id}).catch(err => {
    errorAddEvent(err, "documentation query error");
  });
};