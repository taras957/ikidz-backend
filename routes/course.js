
const express = require('express')
const router = express.Router()

// imports from controllers

const { updateCourse,createCourse } = require('../controllers/course')

router.patch('/course/:courseId', updateCourse )
router.post('/course/create', createCourse )

module.exports = router 