const Home = require("../models/home");
const Image = require("../models/image");
const Courses_options = require("../models/course_options");

const mongoose = require("mongoose");
const { updateImg, deleteImg } = require("../helpers/image-operations");

exports.getCourseCategories = async (req, res) => {
  try {
    const categories = await Courses_options.find();

    res.json(categories);
  } catch (e) {
    res.json({ message: e });
  }
};

exports.getSingleCourse = async (req, res) => {
  try {
    const course = await Home.find(
      {},
      {
        courses: {
          $elemMatch: { _id: mongoose.Types.ObjectId(req.params.courseId) },
        },
      }
    );

    res.json(course[0].courses);
  } catch (e) {
    res.json({ message: e });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    deleteImg(req.params.courseId);
    await Home.update(
      {},
      {
        $pull: {
          courses: { _id: mongoose.Types.ObjectId(req.params.courseId) },
        },
      }
    );
    res.json({ _id: req.params.courseId });
  } catch (e) {
    res.json({ message: e });
  }
};

exports.createCourse = async function (req, res, next) {
  const image_id = mongoose.Types.ObjectId();
  const course_id = mongoose.Types.ObjectId();
  const { translations } = req.body;
  const dataWithImgPath = {
    ...req.body,
    translations: JSON.parse(translations),
    path: req.file.path,
  };
  const imgParams = {
    name: req.file.filename,
    img_path: req.file.path,
    _id: image_id,
    related_document_id: course_id,
  };

  try {
    Image.create(imgParams);

    await Home.findOneAndUpdate(
      {},
      { $addToSet: { courses: { ...dataWithImgPath, _id: course_id } } },
      { returnNewDocument: true }
    );
    res.json({ _id: course_id, ...req.body });
  } catch (e) {
    res.json({ message: e });
  }
};

exports.updateCourse = async function (req, res, next) {
  const related_course_id = req.params.courseId;
  const bodyWithFilePath = {
    ...req.body,
  };

  if (bodyWithFilePath.translations) {
    bodyWithFilePath.translations = JSON.parse(
      bodyWithFilePath.translations || "{}"
    );
  }

  if (req.file) {
    bodyWithFilePath.path = req.file.path;
  }

  const updateParams = Object.keys(bodyWithFilePath).reduce((acc, key) => {
    acc[`courses.$.${key}`] = bodyWithFilePath[key];
    return acc;
  }, {});

  try {
    if (req.file) {
      // update img path in images collection in db
      console.log(related_course_id, "req.file2342343");

      updateImg(related_course_id, req.file.path);
    }

    await Home.findOneAndUpdate(
      {
        courses: {
          $elemMatch: { _id: mongoose.Types.ObjectId(req.params.courseId) },
        },
      },
      { $set: updateParams }
    );
    res.json({ message: "Successfully uploaded", fileInfo: { ...req.file } });
  } catch (e) {
    res.json({
      message: "Upload Failed",
    });
  }
};
