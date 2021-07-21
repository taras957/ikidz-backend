const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

// const { createTeamMember,getAllTeamMembers, updateTeamMember,getSingleTeamMember,deleteMember } = require("../controllers/team");
const { createPartner,getAllPartners,getSinglePartner,updatePartner,deletePartner } = require("../controllers/partner")

const storage = multer.diskStorage({
  destination: "./public/uploads/images/partners",

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post("/partners/create", upload.single("image"), createPartner);
router.get("/partners",  getAllPartners);
router.get("/partners/:partnerId",  getSinglePartner);
router.patch("/partners/:partnerId",upload.single("image"),  updatePartner);
router.delete("/partners/:partnerId", deletePartner);
module.exports = router;
