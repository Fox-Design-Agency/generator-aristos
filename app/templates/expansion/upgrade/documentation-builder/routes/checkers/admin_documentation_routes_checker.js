const fs = require("fs-extra");
const pluginChecker = require("../../../../plugins");
module.exports = {
  async theFunction() {
    await pluginChecker.then(plugin => {
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
    });
  }
};