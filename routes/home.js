
const express = require('express')
const router = express.Router()

// imports from controllers

const {home, updateHomeValues } = require('../controllers/home')
router.get('/home', home )

router.patch('/home/:homeId', updateHomeValues )

module.exports = router 