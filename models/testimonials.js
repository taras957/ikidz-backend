const mongoose = require('mongoose');
const defaultTestimonialSchemaTranslation = {
  title: { type: String, default: 'text placeholder title' },
  date: { type: String, default: 'text placeholder date' },
  description: { type: String, default: 'text placeholder' },
};

const TestimonialSchema = new mongoose.Schema(
  {
    is_active: Boolean,
    translations: {
      ua: defaultTestimonialSchemaTranslation,
      rus: defaultTestimonialSchemaTranslation,
      eng: defaultTestimonialSchemaTranslation,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', TestimonialSchema);
