const userDataModel = require("../model/User");
const nodeMail = require("nodemailer");
const { response } = require("express");

//create user

const userSignUp = async (req, res) => {
  try {
    let user = await userDataModel.findOne({ email: req.body.email });
    let name = await userDataModel.findOne({ Name: req.body.Name });
    if (!name) {
      if (!user) {
        await userDataModel.create(req.body);
        res.status(201).send({
          message: "User Created Successfully",
        });
      } else {
        res.status(400).send({
          message: `User with ${req.body.email} Already Exists`,
        });
      }
    } else {
      res.status(400).send({
        message: `The Name ${req.body.Name} Already Taken`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//login user

const login = async (req, res) => {
  try {
    let user = await userDataModel.findOne({ email: req.body.email });
    if (user) {
      let pass = user.Password;
      let userPass = req.body.Password;
      if (pass === userPass) {
        res.status(200).send({
          message: "Login Successfully",
        });
      } else {
        res.status(400).send({
          message: "Invalid Password",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//generate Forget password link

const forgotPassword = async (req, res) => {
  try {
    let user = await userDataModel.findOne({ email: req.body.email });
    // console.log(user)
    if (user) {
      let sender = nodeMail.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
      let token = `${process.env.FE_URL}/reset/${user._id}`;
      // console.log(process.env.FE_URL);
      let composeEmail = {
        from: process.env.EMAIL,
        to: user.email,
        subject: "Password Reset Link",
        html: `<p>Click <a href='${token}'>here</a> to reset your password</p>`,
      };

      sender.sendMail(composeEmail, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          res.status(200).send({
            message: ("Mail send Successfully", response.info),
            info,
          });
        }
      });
    } else {
      res.status(400).send({
        message: "Invalid Email",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// Reset Password

const resetLink = async (req, res) => {
  try {
    let user = await userDataModel.findOne({ _id: req.params.id });
    let { Password } = req.body;
    user.Password = Password ? Password : user.Password;
    await user.save();

    res.status(200).send({
      message: "User Edited Successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//get User

const getUser = async (req, res) => {
  try {
    let user = await userDataModel.find();
    res.status(200).send({
      message: "Data Fetched Successfully",
      count: user.length,
      user,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//delete User

const deleteUserById = async (req, res) => {
  let user = await userDataModel.findOne({ _id: req.params.id });
  try {
    if (user) {
      await userDataModel.deleteOne(user);
      res.status(200).send({
        message: "User Deleted Successfully",
      });
    } else {
      res.status(400).send({
        message: "Invalid User",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  userSignUp,
  login,
  forgotPassword,
  getUser,
  deleteUserById,
  resetLink,
};
