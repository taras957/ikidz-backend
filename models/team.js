const mongoose = require("mongoose");
const TeamPersonSchema = new mongoose.Schema(
  {
    is_active: Boolean,
    img_path: String,
    translations: {
      ua: {
        title: String,
        position: String,
        description: String,
      },
      rus: {
        title: String,
        position: String,
        description: String,
      },
      eng: {
        title: String,
        position: String,
        description: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeamPerson", TeamPersonSchema);
