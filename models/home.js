const mongoose = require('mongoose');

const defaultCourseTranslation = {
  title: { type: String, default: 'course title' },
  subtitle: { type: String, default: 'course subtitle' },
  price: { type: String, default: '1 million' },
  age: { type: String, default: 'ever young' },
  duration: { type: String, default: 'forever' },
  description: { type: String, default: 'text placeholder' },
};

const defaultHeroTranslations = {
  title: {
    type: String,
    trim: true,
    required: true,
    max: 45,
    default: 'text placeholder',
  },
  sub_title: {
    type: String,
    trim: true,
    required: true,
    max: 150,
    default: 'text placeholder',
  },
  button: { type: String, default: 'text placeholder' },
};

const CourseSchema = new mongoose.Schema(
  {
    category: String,
    is_active: Boolean,
    path: String,
    translations: {
      ua: defaultCourseTranslation,
      rus: defaultCourseTranslation,
      eng: defaultCourseTranslation,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Course', CourseSchema);
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
      rus: defaultHeroTranslations,
      ua: defaultHeroTranslations,
      eng: defaultHeroTranslations,
    },
    'about-us': {
      title: String,
      subtitle: String,
      motto: String,
    },
    'our-team': [String],
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

module.exports = mongoose.model('Home', HomeSchema);
