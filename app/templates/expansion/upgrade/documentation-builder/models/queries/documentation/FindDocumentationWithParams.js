const Documentation = require("../../documentation");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds documentation with the stuff param in the Documentation collection.
 * @param {object} stuff - The Iobject of the stuff to find.
 * @return {promise} A promise that resolves with all the documentation that matches the stuff param
 */
module.exports = stuff => {
  return Documentation.find(stuff).catch(err => {
    errorAddEvent(err, "documentation query error");
  });
};

