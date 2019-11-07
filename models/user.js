const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const todoSchema = mongoose.Schema({
  text: { type: String, required: true },
  status: String,
});

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  todos: [todoSchema],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
