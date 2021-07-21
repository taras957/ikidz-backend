const Partner = require("../models/partners");
const Image = require("../models/image");
const mongoose = require("mongoose");

const { updateImg, deleteImg } = require("../helpers/image-operations");

exports.createPartner = async function (req, res, next) {
  const image_id = mongoose.Types.ObjectId();
  const partner_id = mongoose.Types.ObjectId();
  const { translations } = req.body;

  const dataWithImgPath = {
    ...req.body,
    translations: JSON.parse(translations),
    img_path: req.file.path,
    _id:partner_id
  };
  const imgParams = {
    name: req.file.filename,
    img_path: req.file.path,
    _id: image_id,
    related_document_id: partner_id,
  };

  try {
    Image.create(imgParams);
    await  Partner.create(dataWithImgPath, function (err) {
      if (err) {
        throw new Error(err);
      }
    });

    res.json({ _id: partner_id, ...req.body });
  } catch (e) {
    res.json({ message: e });
  }
};

exports.getAllPartners = async function (req, res, next ) {
  try {
  const partners =  await Partner.find({});
    res.json(partners);
  } catch (e) {
    res.json({ message: e });
  }
};
exports.getSinglePartner = async function (req, res, next ) {
  try {
  const partners =  await Partner.find({
    _id:mongoose.Types.ObjectId(req.params.partnerId)
  });
    res.json(partners);
  } catch (e) {
    res.json({ message: e });
  }
};

exports.updatePartner = async function (req, res, next ) {
 const bodyWithFilePath = {
    ...req.body,
  };

  if (bodyWithFilePath.translations) {
    bodyWithFilePath.translations = JSON.parse(
      bodyWithFilePath.translations || "{}"
    );
  }



  try {

 if (req.file) {
    bodyWithFilePath.img_path = req.file.path;
    updateImg(req.params.partnerId, req.file.path);
console.log( bodyWithFilePath)
  }

    
  const partners =  await Partner.findOneAndUpdate(
    {
     _id :  mongoose.Types.ObjectId(req.params.partnerId)
  },
  { $set:  bodyWithFilePath }, {
  new: true
}
  );

    res.json(partners);
  } catch (e) {
    res.json({ message: e });
  }
};

exports.deletePartner = async (req, res) => {
  try {
    deleteImg(req.params.partnerId);
    await Partner.deleteOne(
      {_id: mongoose.Types.ObjectId(req.params.partnerId)}
    );
    res.json({ _id: req.params.partnerId });
  } catch (e) {
    res.json({ message: e });
  }
};