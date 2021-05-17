const express = require("express");
const router = express.Router();
const path = require("path");

const { InsertCourseImage } = require("../controllers/course");

// imports from controllers

const { updateCourse, createCourse } = require("../controllers/course");

const multer = require("multer");
// Uploading image to mongoDB Atlas
const storage = multer.diskStorage({
  destination: "./public/uploads/images/courses",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + " " + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.post(
  "/course/image/create/:courseId",
  upload.single("image"),
  InsertCourseImage
);

router.patch("/course/:courseId", updateCourse);
router.post("/course/create", createCourse);

module.exports = router;
