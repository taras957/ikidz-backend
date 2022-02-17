const mongoose = require('mongoose');

const defaultCourses_optionsTranslation = {
  value: { type: String, default: 'text placeholder ' },
  label: { type: String, default: 'text placeholder ' },
};

const Courses_options = new mongoose.Schema({
  ua: defaultCourses_optionsTranslation,
  rus: defaultCourses_optionsTranslation,
  eng: defaultCourses_optionsTranslation,
});
module.exports = mongoose.model('Courses_options', Courses_options);
