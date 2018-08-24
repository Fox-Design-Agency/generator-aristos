const fs = require("fs-extra");
const pluginChecker = require("../../../plugins");
module.exports = {
  async theFunction() {
    await pluginChecker.then(plugin => {
      fs.ensureFile(
        "./expansion/upgrade/documentation-builder/routes/documentationRoutes.json",
        err => {
          fs.writeJson(
            "./expansion/upgrade/documentation-builder/routes/documentationRoutes.json",
            {
              route: "./routes/documentation.js"
            }
          );
        }
      );
      plugin.forEach(theThings => {
        if (theThings.switch === "documentationSwitch") {
          if (theThings.switchRoutes === "true") {
            fs.writeJson(
              "./expansion/upgrade/documentation-builder/routes/documentationRoutes.json",
              {
                route: `../../plugins/${theThings.folder}/switchRoutes.js`
              }
            );
          } else {
            fs.ensureFile(
              "./expansion/upgrade/documentation-builder/routes/documentationRoutes.json",
              err => {
                fs.writeJson(
                  "./expansion/upgrade/documentation-builder/routes/documentationRoutes.json",
                  {
                    route: "./routes/documentation.js"
                  }
                );
              }
            );
          }
        }
      });
    });
  }
};
