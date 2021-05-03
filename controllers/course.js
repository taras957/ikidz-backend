const Home = require("../models/Home");
 var mongoose = require('mongoose');


exports.createCourse = async (req, res) => {


  try {
  await Home.updateOne(
      {},
      { $addToSet:  {"courses":req.body }}
, (err,course) => {
     console.log(course,'7987');
   } );
    res.json({ _id: req.params.courseId, ...req.body });
  } catch (e) {
    res.json({ message: e });
  }
};

exports.updateCourse = async (req, res) => {

 const updateParams = Object.keys(req.body).reduce((acc,key)=> {
  acc[`courses.$.${key}`] = req.body[key]
  return acc
  },{})

  try {
  await Home.findOneAndUpdate(
      {'courses': {'$elemMatch': {'_id':mongoose.Types.ObjectId(req.params.courseId)}} },
      { $set:  updateParams }
, (err,course) => {
     console.log(course,'7987');
   } );
    res.json({ _id: req.params.courseId, ...req.body });
  } catch (e) {
    res.json({ message: e });
  }
};
