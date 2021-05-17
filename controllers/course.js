const Home = require("../models/home");
var mongoose = require("mongoose");

exports.createCourse = async (req, res) => {
  try {
    const course = await Home.findOneAndUpdate(
      {},
      { $addToSet: { courses: req.body } },
      { returnNewDocument: true }
    );
    const addedCourseId = course.courses[course.courses.length - 1]._id;
    console.log(course.courses, "CHECKID");
    res.json({ _id: addedCourseId, ...req.body });
  } catch (e) {
    res.json({ message: e });
  }
};

exports.updateCourse = async (req, res) => {
  const updateParams = Object.keys(req.body).reduce((acc, key) => {
    acc[`courses.$.${key}`] = req.body[key];
    return acc;
  }, {});

  try {
    await Home.findOneAndUpdate(
      {
        courses: {
          $elemMatch: { _id: mongoose.Types.ObjectId(req.params.courseId) },
        },
      },
      { $set: updateParams },
      (err, course) => {}
    );
    res.json({ _id: req.params.courseId, ...req.body });
  } catch (e) {
    res.json({ message: e });
  }
};

exports.InsertCourseImage = async function (req, res, next) {
  const updateParams = Object.keys(req.body).reduce((acc, key) => {
    acc[`courses.$.${key}`] = req.body[key];
    return acc;
  }, {});

  try {
    await Home.findOneAndUpdate(
      {
        courses: {
          $elemMatch: { _id: mongoose.Types.ObjectId(req.params.courseId) },
        },
      },
      { $set: { "courses.$.path": req.file.path } },
      (err, course) => {}
    );
    res.json({ message: "Successfully uploaded", fileInfo: { ...req.file } });
  } catch (e) {
    res.json({
      message: "Upload Failed",
    });
  }
};
