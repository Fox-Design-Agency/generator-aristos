const Changelog = require("../../changelog");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Sorts changelogs by ids.
 * @param {string} ids - The ids available to sort.
 * @return {promise} A promise that resolves with the sorted changelogs
 */
module.exports = ids => {
  return sortLogs(ids, function() {
    Changelog.find({}).sort({ sorting: 1 });
  }).catch(err => {
    errorAddEvent(err, "changelog query error");
  });
}; //* end of exports */
/* Sort pages function */
/* rebuild so that pages sort in category view use all pages id to not mess up ordering */
function sortLogs(ids, cb) {
  let count = 0;

  for (let i = 0; i < ids.length; i++) {
    let id = ids[i];
    count++;

    (function(count) {
      Changelog.findById(id).then(log => {
        log.sorting = count;
        log.save();

        ++count;
        if (count >= ids.length) {
          cb();
        }
      });
    })(count);
  }
} /* end of sort pages function */


