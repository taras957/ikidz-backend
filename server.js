const express = require("express");

const app = express();

const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/home");
const bootstrapRoute = require("./routes/bootstrap");
const courseRoutes = require("./routes/course");
const teamRoutes = require("./routes/team");
const partnerRoutes = require("./routes/partner");
const testimonialsRoutes = require("./routes/testimonials");
const testLessonRoutes = require("./routes/test-course");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
var session = require('express-session')

require("dotenv").config();

// connectDB

mongoose
  .connect(process.env.DATABASE_CLOUD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connected DB"))
  .catch((e) => {
    console.log(e);
  });
// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
  cors(    
  )
);

app.use("/public", express.static(path.resolve(__dirname + "/public")));

app.use("/api", authRoutes);
app.use("/api", homeRoutes);
app.use("/api", bootstrapRoute);
app.use("/api", courseRoutes);
app.use("/api", teamRoutes);
app.use("/api", testimonialsRoutes);
app.use("/api", partnerRoutes);
app.use("/api", testLessonRoutes);
 



const port = process.env.PORT || 80;

app.listen(port, () => {
  console.log(`api is running on port ${port}`);
});
