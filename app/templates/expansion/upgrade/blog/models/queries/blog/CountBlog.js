const Blog = require("../../blog");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger").addError;
/**
 * Finds a single blog in the Blog collection.
 * @param {object} blogProps - Object containing <change this>
 * @return {promise} A promise that resolves with the Blog that was created
 */
module.exports = () => {
  return Blog.estimatedDocumentCount({}).then(c => {
      return c
    })
};