const fs = require("fs-extra");
const pluginChecker = require("../../../plugins");
module.exports = {
  async theFunction() {
    await pluginChecker.then(plugin => {
      fs.ensureFile(
        "./expansion/upgrade/products/routes/productRoutes.json",
        err => {
          fs.writeJson(
            "./expansion/upgrade/products/routes/productRoutes.json",
            {
              route: "./routes/admin_products"
            }
          );
        }
      );

      plugin.forEach(theThings => {
        if (theThings.switch === "productsSwitch") {
          if (theThings.switchRoutes === "true") {
            fs.writeJson(
              "./expansion/upgrade/products/routes/productRoutes.json",
              { route: `../../plugins/${theThings.folder}/switchRoutes.js` }
            );
          } else {
            fs.ensureFile(
              "./expansion/upgrade/products/routes/productRoutes.json",
              err => {
                fs.writeJson(
                  "./expansion/upgrade/products/routes/productRoutes.json",
                  {
                    route: "./routes/admin_products"
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
