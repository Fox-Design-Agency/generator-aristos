const mongoose = require("mongoose");
const config = require("../config/config.js");
module.exports = () => {
  /* this sets mongoose promise handling to the native js promise */
  mongoose.Promise = global.Promise;
  /* Start Connect to db */
  mongoose
    .connect(config.read("database"), {
      useNewUrlParser: true
    })
    .then(() => console.log("MongoDB Connected...."))
    .catch(err => console.log(err));
  /* end of mongoose initialization */
};
