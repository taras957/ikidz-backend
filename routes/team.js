const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const { createTeamMember,getAllTeamMembers, updateTeamMember,getSingleTeamMember,deleteMember } = require("../controllers/team");

const storage = multer.diskStorage({
  destination: "./public/uploads/images/team",

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post("/team-person/create", upload.single("image"), createTeamMember);
router.get("/team-persons",  getAllTeamMembers);
router.get("/team-person/:personId",  getSingleTeamMember);
router.patch("/team-person/:personId",upload.single("image"),  updateTeamMember);
router.delete("/team-person/:personId", deleteMember);
module.exports = router;
