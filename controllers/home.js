const Home = require("../models/home");
const { toDotAnnotation } = require("../helpers/objectDotAnnotation");

exports.home = async (req, res) => {
  const HomeInfo = await Home.find();

  try {
    res.json(HomeInfo);
  } catch (e) {
    res.json({ message: e });
  }
};

exports.updateHomeValues = async (req, res) => {
  const params = toDotAnnotation(req.body);
  try {
    await Home.updateOne({ _id: req.params.homeId }, { $set: params });
    res.json({ _id: req.params.homeId, ...req.body });
  } catch (e) {
    res.json({ message: e });
  }
};
