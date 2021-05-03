const mongoose = require("mongoose");

const  Schema = mongoose.Schema;

const  ImageSchema = new Schema(
    {
        originalname: {type: String,  max: 100},
        img: {data: Buffer, contentType: String}
    }
);

module.exports = mongoose.model("Image", ImageSchema);