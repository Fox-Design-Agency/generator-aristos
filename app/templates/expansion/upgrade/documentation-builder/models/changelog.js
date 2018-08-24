const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
/* Page Schema */
const ChangelogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "DocumentationCategory"
  },
  slug: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  published: {
    type: String,
    default: moment().format("dddd, MMM Do YYYY")
  },
  sorting: {
    type: Number
  },
  description: {
    type: String
  },
  keywords: {
    type: String
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Changelog", ChangelogSchema);

