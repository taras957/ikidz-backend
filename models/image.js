const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: String,
  img_path: String,
  related_document_id: String,
});

//Image is a model which has a schema imageSchema

module.exports = new mongoose.model("Image", imageSchema);
