const ProjectCategory = require("../../projectCategory");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger").addError;
/**
 * Finds a single page in the Page collection.
 * @param {object} pageProps - Object containing title, slug, content, parent, 100, description, keywords, author
 * @return {promise} A promise that resolves with the Page that was created
 */
module.exports = projectCategoryProps => {
  const projectCategory = new ProjectCategory(projectCategoryProps);
  projectCategory.save().catch(err => errorAddEvent(err, "project category query error"));
};
