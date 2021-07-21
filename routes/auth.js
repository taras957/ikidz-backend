const express = require("express");
const router = express.Router();

// imports from controllers
const { checkRootLogin } = require("../helpers/checkRootLogin");

const {
  register,
  registerActivate,
  login,
  getUser,
} = require("../controllers/auth");
// apply validators
const {
  userRegisterValidator,
  userLoginValidator,
} = require("../validators/auth");
const { runValidation } = require("../validators");

router.get("/get-user", checkRootLogin, getUser);
router.post("/register", userRegisterValidator, runValidation, register);
router.post("/register/activate", registerActivate);
router.post("/login", userLoginValidator, runValidation, login);

module.exports = router;
