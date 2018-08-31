const fs = require("fs-extra");
const Medias = fs.readJSONSync(
  "./important/admin/routes/checkers/media/MediaModelRoutes.json"
).route;
const Media = require(Medias);
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger").addError;
/**
 * Counts the media in the Media collection.
 * @return {promise} A promise that resolves with the count
 */
module.exports = () => {
  return Media.estimatedDocumentCount({}).then(c => {
      return c
    }).catch(err=>{
        addErrorEvent(err, "image media query error")
    })
};