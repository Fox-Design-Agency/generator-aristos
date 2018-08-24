const express = require("express");
const router = express.Router();

/*
* GET Product index
*/
router.get("/", (req, res, next)=>{
    res.redirect("/admin")
});

module.exports = router;