const User = require("../models/user");
const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");
const { registerEmailParams } = require("../helpers/email");
const shortid = require("shortid");
new AWS.Config({
  apiVersion: "2010-12-01",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

exports.getUser = (req, res) => {
  // const { token, user } = req.body;
  console.log(req.user, "req344334r3");
  return res.json({ user: req.user, token:req.token  });
};
exports.register = (req, res) => {
  const { name, email, password } = req.body;

  //check if user already exist
  User.findOne({ email }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }
    //  generate token with user email and password
    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      {
        expiresIn: "10m",
      }
    );
    res.json({
      message: `Email has been sent to ${email}. token ${token} Follow the instructions to complete your registration`,
    });
    // send email with validation token
    const params = registerEmailParams(email, token);

    // const sendEmailOnRegister =new AWS.SES().sendEmail(params).promise()
    // sendEmailOnRegister
    // .then((data) => {
    //   console.log('email submitted', data)
    //   res.json({
    //     message: `Email has been sent to ${email}. Follow the instructions to complete your registration`
    //   })
    // } )
    // .catch((e)=>  {
    //   console.log('email reg error',e)
    //    res.json({
    //     message: `We could not verify your email, try again`
    //   })
    // })
  });

  console.log("REGISTER CONTROLLER", req.body);
};

exports.registerActivate = (req, res) => {
  const { token } = req.body;

  // verifying jwt web token if token has this key, token is valid
  jwt.verify(
    token,
    process.env.JWT_ACCOUNT_ACTIVATION,
    function (error, decoded) {
      if (error) {
        return res.status(401).json({
          error: "Expired link. Try again",
        });
      }

      const { name, email, password } = jwt.decode(token);
      const username = shortid.generate();

      User.findOne({ email }).exec((err, user) => {
        if (user) {
          return res.status(401).json({
            error: "Email is taken",
          });
        }

        // if no user, then create new one

        const newUser = new User({ name, username, email, password });
        newUser.save((err, result) => {
          if (err) {
            return res.status(401).json({
              error: "Error saving user in database. try later",
            });
          }
          return res.json({
            message: "Registration Success. Please Login",
          });
        });
      });
    }
  );
};
exports.login = (req, res) => {
  const { email, password } = req.body;
  console.table({ email, password });

  // check if user with email exist
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with this email does not exist. Please register",
      });
    }
    console.log(user, "user");
    // check if user password is valid
    //  use authenticate method from user model
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match",
      });
    }

    // if password match , generate token, send to a client

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const { _id, name, email, role } = user;
    const oneDayToSeconds = 24 * 60 * 60;

// res.writeHead(200, {
//       "Set-Cookie": `userId=${token}; HttpOnly`,
//       "Access-Control-Allow-Credentials": "true",
//       "maxAge": oneDayToSeconds, 

//     })

    res.cookie("userId",token, {
      maxAge: oneDayToSeconds, 
      // You can't access these tokens in the client's javascript
      httpOnly: true,
      // "Access-Control-Allow-Credentials": "true",
      // Forces to use https in production
      secure: process.env.NODE_ENV === "production" ? true : false,
    });

    return res.json({ token, user: { _id, name, email, role } });
  });
};
