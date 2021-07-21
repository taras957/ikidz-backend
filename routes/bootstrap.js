const express = require("express");
const router = express.Router();
// imports from controllers

const { bootstrapApp } = require("../controllers/bootstrap");
router.get("/bootstrap", bootstrapApp);

module.exports = router;
