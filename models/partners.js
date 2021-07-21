const mongoose = require("mongoose");

const PartnerSchema = new mongoose.Schema(
  {
    is_active: Boolean,
    link: String,
    img_path:String,
    translations: {
      ua: {
        title: String,
        
      },
      rus: {
        title: String,
       
      },
      eng: {
        title: String,
      
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Partner", PartnerSchema);
