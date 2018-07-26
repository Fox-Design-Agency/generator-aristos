const Documentation = require("../../documentation");
/* Aristos Logger Path */
// const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger").addError;
/**
 * Sorts pages by ids.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the page that matches the id
 */
module.exports = ids => {
  return sortDocumentation(ids, function() {
    Documentation.find({}).sort({ sorting: 1 });
  });
}; //* end of exports */
/* Sort documentation function */
/* rebuild so that documentation sort in category view use all pages id to not mess up ordering */
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
