const express = require("express");
const router = express.Router();

const auth = require("../../../../important/AppStuff/authorization/auth");

const isAdmin = auth.isAdmin;
const changelogController = require("../controllers/changelog_controller");

/*
* GET log index
*/
router.get("/", isAdmin, changelogController.index);

/*
* GET log cats index
*/
router.get("/sorted/:category", isAdmin, changelogController.catIndex);

/*
* GET, POST add log
*/
router
  .route("/add-log")
  .get(isAdmin, changelogController.addIndex)
  .post(changelogController.create);
/*
* GET, POST edit log
*/
router
  .route("/edit-log/:id")
  .get(isAdmin, changelogController.editIndex)
  .post(changelogController.edit);

/*
* GET delete log
*/
router.delete(
  "/delete-log/:id",
  isAdmin,
  changelogController.deleteProject
);

/* 
* POST reorder logs
*/
router.post("/reorder-logs", changelogController.reorder);

/* Exports */
module.exports = router;

