
const express = require('express')
const router = express.Router()

// imports from controllers

const {register,registerActivate, login} = require('../controllers/auth')
// apply validators
const {userRegisterValidator,userLoginValidator} = require('../validators/auth')
const {runValidation} = require('../validators')

router.post('/register',userRegisterValidator,runValidation,  register )
router.post('/register/activate',  registerActivate )
router.post('/login',userLoginValidator,runValidation, login )


module.exports = router 