// import mongoose from index.js
const mongoose = require("./index");


//using funtion for validate Email
const validateEmail = (e) => {
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(e);
};

//create new mongoose schema
const userSchema = new mongoose.Schema(
  {
    Name: { type: String, required: [true, "FirstName is required"] },
    email: {
      type: String,
      required: [true, "email is required"],
      validate: validateEmail,
    },
    Password: { type: String, required: [true, "Password is required"] },
    createAt: { type: Date, default: Date.now() },
  },
  {
    collection: "Pass_Reset",
    versionKey: false,
  }
);

let userDataModel = mongoose.model("Pass_Reset", userSchema);

// export default userModel
module.exports = userDataModel;
