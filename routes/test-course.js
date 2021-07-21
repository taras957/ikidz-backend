const express = require("express");
const router = express.Router();


const { createTestLesson} = require("../controllers/test-lesson");





router.post("/test-lesson/create",  createTestLesson);

module.exports = router;
