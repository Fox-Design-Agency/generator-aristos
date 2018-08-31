const fs = require("fs-extra");
const Changelogs = fs.readJSONSync(
  "./expansion/upgrade/documentation-builder/routes/checkers/changelogModelRoutes.json"
).route;
const Changelog = require(Changelogs);
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
/* Sort changelogs function */
/* rebuild so that changelogs sort in category view use all changelogs id to not mess up ordering */
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
} /* end of sort changelogs function */