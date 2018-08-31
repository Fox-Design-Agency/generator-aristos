const fs = require("fs-extra");
const Medias = fs.readJSONSync(
  "./important/admin/routes/checkers/media/MediaModelRoutes.json"
).route;
const Media = require(Medias);
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Creates a single media in the Media collection.
 * @param {object} mediaProps - Object containing <change this>
 * @return {promise} A promise that resolves with the media that was created
 */
module.exports = mediaProps => {
  const media = new Media(mediaProps);
  return media.save().catch(err => {
    addErrorEvent(err, "image media query error");
  });
};