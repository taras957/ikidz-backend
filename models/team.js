const mongoose = require('mongoose');

const defaultTeamTranslation = {
  title: { type: String, default: 'text placeholder title' },
  position: { type: String, default: 'text placeholder position' },
  description: { type: String, default: 'text placeholder' },
};

const TeamPersonSchema = new mongoose.Schema(
  {
    is_active: Boolean,
    img_path: String,
    translations: {
      ua: defaultTeamTranslation,
      rus: defaultTeamTranslation,
      eng: defaultTeamTranslation,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TeamPerson', TeamPersonSchema);
