const Image = require("../models/image");
const fs = require("fs");

exports.updateImg = (documentId, newImgPath) => {
  Image.findOneAndUpdate(
    {
      related_document_id: documentId,
    },
    { $set: { img_path: newImgPath } },
    function (err, img) {
      if (img) {
        fs.unlink(img.img_path, function () {});
      }
    }
  );
};
exports.deleteImg = (documentId) => {
  Image.findOneAndRemove(
    {
      related_document_id: documentId,
    },

    function (err, img) {
      if (img) {
        fs.unlink(img.img_path, function () {});
      }
    }
  );
};
