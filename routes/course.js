const express = require('express');
const router = express.Router();
const path = require('path');
const { checkRootLogin } = require('../helpers/checkRootLogin');

// imports from controllers

const {
  updateCourse,
  createCourse,
  deleteCourse,
  getSingleCourse,
  getCourseCategories,
} = require('../controllers/course');

const multer = require('multer');
// Uploading image to mongoDB Atlas
const storage = multer.diskStorage({
  destination: './public/uploads/images/courses',

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.get('/course/categories', getCourseCategories);

router.get('/course/:courseId', getSingleCourse);
router.patch(
  '/course/:courseId',
  checkRootLogin,
  upload.single('image'),
  updateCourse
);
// router.patch("/course/toggleActive/:courseId", toggleCourseActive);
router.post('/course/create', upload.single('image'), createCourse);
router.delete('/course/:courseId', checkRootLogin, deleteCourse);

module.exports = router;
