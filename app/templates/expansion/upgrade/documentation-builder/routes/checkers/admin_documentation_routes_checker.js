const fs = require("fs-extra");
const pluginChecker = require("../../../../plugins");
module.exports = {
  async theFunction() {
    await pluginChecker.then(plugin => {
      plugin.forEach(theThings => {
        if (theThings.switch === "documentationSwitch") {
          if (theThings.switchRoutes === "true") {
            fs.writeJson(
              "./expansion/upgrade/documentation-builder/routes/checkers/documentationRoutes.json",
              {
                route: `../../plugins/${theThings.folder}/switchRoutes.js`
              }
            );
          } else {
            fs.pathExists(
              "./expansion/upgrade/documentation-builder/routes/checkers/documentationRoutes.json",
              (err, exists) => {
                if (!exists) {
                  fs.writeJson(
                    "./expansion/upgrade/documentation-builder/routes/checkers/documentationRoutes.json",
                    {
                      route: "./routes/documentation.js"
                    }
                  );
                }
              }
            );
          }
        }
      });
      /* default documentation routes */
      fs.pathExists(
        "./expansion/upgrade/documentation-builder/routes/checkers/documentationRoutes.json",
        (err, exists) => {
          if (!exists) {
            fs.writeJson(
              "./expansion/upgrade/documentation-builder/routes/checkers/documentationRoutes.json",
              {
                route: "./routes/documentation.js"
              }
            );
          }
        }
      );
      fs.pathExists(
        "./expansion/upgrade/documentation-builder/routes/checkers/changelogRoutes.json",
        (err, exists) => {
          if (!exists) {
            fs.writeJson(
              "./expansion/upgrade/documentation-builder/routes/checkers/changelogRoutes.json",
              {
                route: "./routes/changelog.js"
              }
            );
          }
        }
      );
      /* end of default documentation routes */
      /* default documentation Model routes */
      fs.pathExists(
        "./expansion/upgrade/documentation-builder/routes/checkers/changelogModelRoutes.json",
        (err, exists) => {
          if (!exists) {
            fs.writeJson(
              "./expansion/upgrade/documentation-builder/routes/checkers/changelogModelRoutes.json",
              {
                route: "../../changelog.js"
              }
            );
          }
        }
      );
      fs.pathExists(
        "./expansion/upgrade/documentation-builder/routes/checkers/documentationModelRoutes.json",
        (err, exists) => {
          if (!exists) {
            fs.writeJson(
              "./expansion/upgrade/documentation-builder/routes/checkers/documentationModelRoutes.json",
              {
                route: "../../documentation.js"
              }
            );
          }
        }
      );
      /* end of default documentation Model routes */
    });
  }
};