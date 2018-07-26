const express = require("express");
const router = express.Router();
const auth = require("../../../../important/AppStuff/authorization/auth");
const isAdmin = auth.isAdmin;
const documentationCategoriesController = require("../controllers/documentation_categories_controller");

/*
* GET documentation categories index
*/
router.get("/", isAdmin, documentationCategoriesController.index);
/*
* GET, POST add documentation categories
*/
router
  .route("/add-documentation-category")
  .get(isAdmin, documentationCategoriesController.addIndex)
  .post(documentationCategoriesController.create);

/*
* GET, POST edit documentation categories
*/
router
  .route("/edit-documentation-category/:id")
  .get(isAdmin, documentationCategoriesController.editIndex)
  .post(documentationCategoriesController.edit);

/*
* GET delete documentation categories
*/
router.delete(
  "/delete-documentation-category/:id",
  isAdmin,
  documentationCategoriesController.delete
);
/* 
* POST reorder documentation categories
*/
router.post("/reorder-documentation-cats", documentationCategoriesController.reorder);

/* Exports */
module.exports = router;
