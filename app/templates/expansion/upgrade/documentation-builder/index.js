require("./routes/checkers/admin_documentation_routes_checker").theFunction();
const adminChangelong = require("./routes/changelog");
const adminDocumentationCategories = require("./routes/documentation_categories");

const fs = require("fs-extra");
const adminDocumentation = fs.readJSONSync(
  "./expansion/upgrade/documentation-builder/routes/checkers/documentationRoutes.json"
).route;
const adminDocumentations = require(adminDocumentation);

module.exports = app => {
  app.use("/admin/documentation-builder", adminDocumentations);
  app.use("/admin/changelog-builder", adminChangelong);
  app.use(
    "/admin/documentation-builder-categories",
    adminDocumentationCategories
  );
};