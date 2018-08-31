require("./routes/checkers/admin_documentation_routes_checker").theFunction();
const adminDocumentationCategories = require("./routes/documentation_categories");

const fs = require("fs-extra");
const adminDocumentation = fs.readJSONSync(
  "./expansion/upgrade/documentation-builder/routes/checkers/documentationRoutes.json"
).route;
const adminDocumentations = require(adminDocumentation);
const adminChangelong = fs.readJSONSync(
  "./expansion/upgrade/documentation-builder/routes/checkers/changelogRoutes.json"
).route;
const adminChangelongs = require(adminChangelong);

module.exports = app => {
  app.use("/admin/documentation-builder", adminDocumentations);
  app.use("/admin/changelog-builder", adminChangelongs);
  app.use(
    "/admin/documentation-builder-categories",
    adminDocumentationCategories
  );
};