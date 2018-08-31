const fs = require("fs-extra");
const Projects = fs.readJSONSync(
  "./expansion/upgrade/portfolio-projects/routes/checkers/portfolioModelRoutes.json"
).route;
const Project = require(Projects);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the projects that match the stuff param in the Project collection.
 * @param {object} stuff - The object of the stuff to find.
 * @return {promise} A promise that resolves with the project(s) that match the stuff param
 */
module.exports = stuff => {
  return Project.find(stuff)
    .populate("category")
    .populate("author")
    .catch(err => {
      errorAddEvent(err, "project query error");
    });
};