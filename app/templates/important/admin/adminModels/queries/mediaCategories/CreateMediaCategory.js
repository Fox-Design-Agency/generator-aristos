const MediaCategory = require("../../mediaCategory");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger").addError;
/**
 * Finds a single page in the Page collection.
 * @param {object} pageProps - Object containing <change this>
 * @return {promise} A promise that resolves with the Page that was created
 */
module.exports = mediaCategoryProps => {
  const mediaCategory = new MediaCategory(mediaCategoryProps);
  mediaCategory.save().catch(err => addErrorEvent(err, "media category error"));
};
