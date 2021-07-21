const TeamPerson = require("../models/team");
const Image = require("../models/image");
const mongoose = require("mongoose");

const { updateImg, deleteImg } = require("../helpers/image-operations");

exports.createTeamMember = async function (req, res, next) {
  const image_id = mongoose.Types.ObjectId();
  const person_id = mongoose.Types.ObjectId();
  const { translations } = req.body;

  const dataWithImgPath = {
    ...req.body,
    translations: JSON.parse(translations),
    img_path: req.file.path,
    _id:person_id
  };
  const imgParams = {
    name: req.file.filename,
    img_path: req.file.path,
    _id: image_id,
    related_document_id: person_id,
  };

  try {
    Image.create(imgParams);
    await TeamPerson.create(dataWithImgPath, function (err) {
      if (err) {
        throw new Error(err);
      }
    });

    res.json({ _id: course_id, ...req.body });
  } catch (e) {
    res.json({ message: e });
  }
};

exports.getAllTeamMembers = async function (req, res, next ) {
  try {
  const members =  await TeamPerson.find({});
    res.json(members);
  } catch (e) {
    res.json({ message: e });
  }
};
exports.getSingleTeamMember = async function (req, res, next ) {
  try {
  const member =  await TeamPerson.find({
    _id:mongoose.Types.ObjectId(req.params.personId)
  });
    res.json(member);
  } catch (e) {
    res.json({ message: e });
  }
};

exports.updateTeamMember = async function (req, res, next ) {
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
    updateImg(req.params.personId, req.file.path);
console.log( bodyWithFilePath)
  }

    
  const members =  await TeamPerson.findOneAndUpdate(
    {
     _id :  mongoose.Types.ObjectId(req.params.personId)
  },
  { $set:  bodyWithFilePath }, {
  new: true
}
  );

    res.json(members);
  } catch (e) {
    res.json({ message: e });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    deleteImg(req.params.personId);
    await TeamPerson.deleteOne(
      {_id: mongoose.Types.ObjectId(req.params.personId)}
    );
    res.json({ _id: req.params.personId });
  } catch (e) {
    res.json({ message: e });
  }
};