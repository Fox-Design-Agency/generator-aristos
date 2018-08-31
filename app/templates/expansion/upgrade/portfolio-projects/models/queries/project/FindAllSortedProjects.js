const fs = require("fs-extra");
const Projects = fs.readJSONSync(
  "./expansion/upgrade/portfolio-projects/routes/checkers/portfolioModelRoutes.json"
).route;
const Project = require(Projects);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the projects sorted in the Project collection.
 * @return {promise} A promise that resolves with all the projects sorted
 */
module.exports = () => {
  return Project.find({})
    .sort({ sorting: 1 })
    .populate("category")
    .populate("author")
    .catch(err => {
      errorAddEvent(err, "project query error");
    });
};