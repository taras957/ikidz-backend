const mongoose = require("mongoose");

const Courses_options = new mongoose.Schema({
  ua: {
    value: String,
    label: String,
  },
  rus: {
    value: String,
    label: String,
  },
  eng: {
    value: String,
    label: String,
  },
});
module.exports = mongoose.model("Courses_options", Courses_options);
