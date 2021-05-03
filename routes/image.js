
const express = require('express')
const router = express.Router()

// imports from controllers

const { InsertImage } = require('../controllers/image')

const multer = require("multer");
// Uploading image to mongoDB Atlas
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post("/image/create", upload.single("image"),InsertImage);

module.exports = router 