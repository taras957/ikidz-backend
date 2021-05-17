const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    price: String,
    age: String,
    category: String,
    duration: String,
    description: String,
    is_active: Boolean,
    path: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Course", CourseSchema);
const DevelopmentSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
  },
  { timestamps: true }
);

const HomeSchema = new mongoose.Schema(
  {
    contacts: {
      tel: {
        tel_number: String,
        responsible: String,
      },
      email: String,
      instagram: String,
      facebook: String,
    },
    hero: {
      title: {
        type: String,
        trim: true,
        required: true,
        max: 45,
      },
      sub_title: {
        type: String,
        trim: true,
        required: true,
        max: 150,
      },
      button: String,
    },
    "about-us": {
      title: String,
      subtitle: String,
      motto: String,
    },
    "our-team": {
      title: String,
      value: String,
    },
    development: {
      title: String,
      list: [DevelopmentSchema],
    },
    courses: [CourseSchema],
    friends: {
      title: String,
    },
    gallery: {
      title: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Home", HomeSchema);
