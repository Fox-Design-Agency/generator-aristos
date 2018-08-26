require("./routes/checkers/admin_project_management_routes_checker").theFunction();

const fs = require("fs-extra");
const adminProjectManagement = fs.readJSONSync(
  "./expansion/upgrade/project-management/routes/checkers/projectManaRoutes.json"
).route;
const adminProjectManagements = require(adminProjectManagement);

module.exports = app => {
  app.use("/admin/project-management", adminProjectManagements);
};