const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const corsPolicy = require("./middlewares/corsPolicy");

const userRoute = require("./routes/user");

const app = express();
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", "loopback");
}
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch(error => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

app.use(corsPolicy);
app.use(passport.initialize());
app.use("/api/users", userRoute);

module.exports = app;

//test
