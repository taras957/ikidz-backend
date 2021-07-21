const Testimonial = require("../models/testimonials");
const mongoose = require("mongoose");

exports.createTestimonial = async function (req, res, next) {
  const _id = mongoose.Types.ObjectId();

  try {
    await Testimonial.create({ _id, ...req.body }, function (err) {
      if (err) {
        throw new Error(err);
      }
    });

    res.json({ _id, ...req.body });
  } catch (e) {
    res.json({ message: e });
  }
};

exports.getAllTestimonials = async function (req, res, next) {
  try {
    const testimonials = await Testimonial.find({});
    res.json(testimonials);
  } catch (e) {
    res.json({ message: e });
  }
};
exports.getSingleTestimonial = async function (req, res, next) {
  try {
    const testimonial = await Testimonial.find(
      {
        _id: mongoose.Types.ObjectId(req.params.testimonialId),
      },
      (err) => {
        if (err) throw new Error(err);
      }
    );
    res.json(testimonial);
  } catch (e) {
    res.json({ message: e });
  }
};

exports.updateTestimonial = async function (req, res, next) {
  try {
    const testimonialsList = await Testimonial.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(req.params.testimonialId),
      },
      { $set: req.body },
      {
        new: true,
      }
    );

    res.json(testimonialsList);
  } catch (e) {
    res.json({ message: e });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.deleteOne({
      _id: mongoose.Types.ObjectId(req.params.testimonialId),
    });
    res.json({ _id: req.params.testimonialId });
  } catch (e) {
    res.json({ message: e });
  }
};
