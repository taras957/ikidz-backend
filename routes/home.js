const express = require("express");
const router = express.Router();
// imports from controllers

const { home, updateHomeValues } = require("../controllers/home");
const {checkRootLogin } = require("../helpers/checkRootLogin");
router.get("/home", home);

router.patch("/home/:homeId", updateHomeValues);

module.exports = router;
