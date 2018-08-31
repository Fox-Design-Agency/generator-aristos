const fs = require("fs-extra");
const Documentations = fs.readJSONSync(
  "./expansion/upgrade/documentation-builder/routes/checkers/documentationModelRoutes.json"
).route;
const Documentation = require(Documentations);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Sorts documentation by ids.
 * @param {string} ids - The ids to sort by.
 * @return {promise} A promise that resolves with the sorted documentation
 */
module.exports = ids => {
  return sortDocumentation(ids, function() {
    Documentation.find({})
      .sort({ sorting: 1 })
      .catch(err => {
        errorAddEvent(err, "documentation query error");
      });
  });
}; //* end of exports */
/* Sort documentation function */
/* rebuild so that documentation sort in category view use all documentations id to not mess up ordering */
function sortDocumentation(ids, cb) {
  let count = 0;

  for (let i = 0; i < ids.length; i++) {
    let id = ids[i];
    count++;

    (function(count) {
      Documentation.findById(id).then(doc => {
        doc.sorting = count;
        doc.save();

        ++count;
        if (count >= ids.length) {
          cb();
        }
      });
    })(count);
  }
} /* end of sort documentation function */