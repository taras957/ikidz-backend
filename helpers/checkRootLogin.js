const jwt = require("jsonwebtoken");
const User = require("../models/user");

const checkRootLogin = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const rootUser = await User.findOne({
      _id: decoded._id,
    });

    if (!rootUser) {
      throw new Error("User cannot find!!");
    }

    req.token = token;
    req.user = rootUser;
    req.user_id = rootUser._id;
    next();
  } catch (e) {
    res.status(401).send({ error: "Authentication problem!!" });
  }
};

module.exports = { checkRootLogin };
