const Image = require("../models/image");
const fs = require("fs");


exports.InsertImage = async function(req, res, next) {
    const image = new Image({
        name: req.body.image_name
    });
    console.log(req.file,'req.file90809');
    image.img.data = req.file.buffer;
    image.img.contentType = "image/jpg";
    image.save(function(err) {
        if (err) { return next(err); }
        res.redirect("/");
    });
}