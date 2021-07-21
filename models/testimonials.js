const mongoose = require("mongoose");
const TestimonialSchema = new mongoose.Schema(
  {
    is_active: Boolean,
    translations: {
      ua: {
        title: String,
        date: String,
        description: String,
      },
      rus: {
        title: String,
        date: String,
        description: String,
      },
      eng: {
        title: String,
        date: String,
        description: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", TestimonialSchema);
