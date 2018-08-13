const getProjectCount = require("./models/queries/documentationCategories/CountDocumentationCategories");
const getDocsCount = require("./models/queries/documentation/CountDocumentation");
const getChangelogsCount = require("./models/queries/changelog/CountLogs");
module.exports = {
  name: "Documentation",
  async theFunction(name, blogCount) {
    let projectCount, docsCount, changelogsCount;
    await Promise.all([
      getProjectCount(),
      getDocsCount(),
      getChangelogsCount()
    ]).then(result => {
      projectCount = result[0];
      docsCount = result[1];
      changelogsCount = result[2];
    });
    return `
    <div class="admin-blocks">
    <a href="/admin/documentation-builder">
        <h5>
            ${name}
        </h5>
        <h4>
            number of projects:
        </h4>
        <h5>
            ${projectCount}
        </h5>
        <h4>
            number of docs:
        </h4>
        <h5>
            ${docsCount}
        </h5>
        <h4>
            number of changelogs:
        </h4>
        <h5>
            ${changelogsCount}
        </h5>
        </a>
    </div>
        `;
  }
};
