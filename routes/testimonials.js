const express = require("express");
const router = express.Router();


const { createTestimonial, getAllTestimonials,getSingleTestimonial,updateTestimonial,deleteTestimonial} = require("../controllers/testimonials");





router.post("/testimonials/create",  createTestimonial);
router.get("/testimonials",  getAllTestimonials);
router.get("/testimonial/:testimonialId",  getSingleTestimonial);
router.patch("/testimonial/:testimonialId",  updateTestimonial);
router.delete("/testimonial/:testimonialId", deleteTestimonial);
module.exports = router;
