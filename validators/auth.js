const {check} = require('express-validator');

exports.userRegisterValidator = [
    check("name")
    .not()
    .isEmpty()
    .withMessage('name is Required'),
      check("email")
    .isEmail()
    .withMessage('Must be valid Email'),
      check("password")
    .isLength({min:6})
    .withMessage('Password length must be more than 5')
]

exports.userLoginValidator = [
      check("email")
    .isEmail()
    .withMessage('Must be valid Email'),
      check("password")
    .isLength({min:6})
    .withMessage('Password length must be more than 5')
]