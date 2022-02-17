const mongoose = require('mongoose');

const defaultTranslation = {
  title: { type: String, default: 'placeholder title' },
};
const PartnerSchema = new mongoose.Schema(
  {
    is_active: Boolean,
    link: String,
    img_path: String,
    translations: {
      ua: defaultTranslation,
      rus: defaultTranslation,
      eng: defaultTranslation,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Partner', PartnerSchema);
