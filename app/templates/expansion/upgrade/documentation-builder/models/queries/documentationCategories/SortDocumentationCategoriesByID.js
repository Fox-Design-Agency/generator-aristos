const DocumentationCategories = require("../../documentationCategory");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Sorts documentation categories by ids.
 * @param {string} ids - The ids of the record to sort by.
 * @return {promise} A promise that resolves with the sorted documentation categories
 */
module.exports = ids => {
  return sortDocumentationCats(ids, function() {
    DocumentationCategories.find({})
      .sort({ sorting: 1 })
      .catch(err => {
        errorAddEvent(err, "documentation category query error");
      });
  });
}; //* end of exports */
/* Sort pages function */
/* rebuild so that pages sort in category view use all pages id to not mess up ordering */
function sortDocumentationCats(ids, cb) {
  let count = 0;

  for (let i = 0; i < ids.length; i++) {
    let id = ids[i];
    count++;

    (function(count) {
      DocumentationCategories.findById(id).then(project => {
        project.sorting = count;
        project.save();

        ++count;
        if (count >= ids.length) {
          cb();
        }
      });
    })(count);
  }
} /* end of sort pages function */

