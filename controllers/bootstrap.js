const Home = require("../models/home");
const Courses_options = require("../models/course_options");
const Partner = require("../models/partners");
const TeamPerson = require("../models/team");
const Testimonial = require("../models/testimonials");

exports.bootstrapApp = async (req, res) => {
  const HomeInfo = await Home.find();
  const categories = await Courses_options.find();
  const partners = await Partner.find({});
  const members = await TeamPerson.find({});
  const testimonials = await Testimonial.find({});

  try {
    res.json({ HomeInfo, categories, partners, members, testimonials });
  } catch (e) {
    res.json({ message: e });
  }
};
