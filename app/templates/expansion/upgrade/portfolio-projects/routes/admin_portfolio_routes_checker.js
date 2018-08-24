const fs = require("fs-extra");
const pluginChecker = require("../../../plugins");
module.exports = {
  async theFunction() {
    await pluginChecker.then(plugin => {
      plugin.forEach(theThings => {
        fs.ensureDir(
          "./expansion/upgrade/portfolio-projects/routes/portfolioRoutes.json",
          err => {
            fs.writeJson(
              "./expansion/upgrade/portfolio-projects/routes/portfolioRoutes.json",
              { route: "./routes/admin_portfolio_projects.js" }
            );
          }
        );
        if (theThings.switch === "portfolioSwitch") {
          if (theThings.switchRoutes === "true") {
            fs.writeJson(
              "./expansion/upgrade/portfolio-projects/routes/portfolioRoutes.json",
              {
                route: `../../plugins/${theThings.folder}/switchRoutes.js`
              }
            );
          } else {
            fs.ensureDir(
              "./expansion/upgrade/portfolio-projects/routes/portfolioRoutes.json",
              err => {
                fs.writeJson(
                  "./expansion/upgrade/portfolio-projects/routes/portfolioRoutes.json",
                  { route: "./routes/admin_portfolio_projects.js" }
                );
              }
            );
          }
        }
      });
    });
  }
};