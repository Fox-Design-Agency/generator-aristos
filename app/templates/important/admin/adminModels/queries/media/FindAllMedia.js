const fs = require("fs-extra");
const Medias = fs.readJSONSync(
  "./important/admin/routes/checkers/media/MediaModelRoutes.json"
).route;
const Media = require(Medias);
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Finds all media in the Media collection.
 * @return {promise} A promise that resolves with all the media
 */
module.exports = () => {
  return Media.find({})
    .populate("category")
    .catch(err => {
      addErrorEvent(err, "image media query error");
    });
};