const fs = require("fs-extra");
const Projects = fs.readJSONSync(
  "./expansion/upgrade/portfolio-projects/routes/checkers/portfolioModelRoutes.json"
).route;
const Project = require(Projects);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Edits a single project in the Project collection
 * @param {objectID} _id - The ID of the project to edit.
 * @param {object} projectProps - Object containing title, slug, content, category, image, description, keywords, author
 * @return {promise} A promise that resolves when the project is edited
 */
module.exports = (_id, projectProps) => {
  return Project.findByIdAndUpdate({_id: _id}, projectProps).catch(err => {
    console.log(err)
    errorAddEvent(err, "project query error");
  });
};