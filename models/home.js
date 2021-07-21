const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    category: String,
    is_active: Boolean,
    path: String,
    translations: {
      ua: {
        title: String,
        subtitle: String,
        price: String,
        age: String,
        duration: String,
        description: String,
      },
      rus: {
        title: String,
        subtitle: String,
        price: String,
        age: String,
        duration: String,
        description: String,
      },
      eng: {
        title: String,
        subtitle: String,
        price: String,
        age: String,
        duration: String,
        description: String,
      },
    },
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
      rus: {
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
      ua: {
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
      eng: {
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
    },
    "about-us": {
      title: String,
      subtitle: String,
      motto: String,
    },
    "our-team": [String],
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
