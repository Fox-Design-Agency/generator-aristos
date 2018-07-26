const adminDocumentation = require("./routes/documentation");
const adminChangelong = require("./routes/changelog");
const adminDocumentationCategories = require("./routes/documentation_categories");
module.exports = app => {
  app.use("/admin/documentation-builder", adminDocumentation);
  app.use("/admin/changelog-builder", adminChangelong);
  app.use("/admin/documentation-builder-categories", adminDocumentationCategories);
};
