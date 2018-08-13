const express = require("express");
const router = express.Router();

const auth = require("../../../../important/AppStuff/authorization/auth");

const isAdmin = auth.isAdmin;
const documentationController = require("../controllers/documentation_controller");

/*
* GET documentation index
*/
router.get("/", isAdmin, documentationController.index);

/*
* GET documentation cats index
*/
router.get("/sorted/:category", isAdmin, documentationController.catIndex);


/*
* GET, POST add documentation
*/
router
  .route("/add-documentation")
  .get(isAdmin, documentationController.addIndex)
  .post(documentationController.create);
/*
* GET, POST edit documentation
*/
router
  .route("/edit-documentation/:id")
  .get(isAdmin, documentationController.editIndex)
  .post(documentationController.edit);


/*
* GET delete documentation
*/
router.delete(
  "/delete-documentation/:id",
  isAdmin,
  documentationController.deleteProject
);

/* 
* POST reorder documentation
*/
router.post("/reorder-documentation", documentationController.reorder);

/* Exports */
module.exports = router;
