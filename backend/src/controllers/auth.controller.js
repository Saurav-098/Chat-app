const express = require("express");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    const isUsernameAlreadyExists = await userModel.findOne({ username });

    if (isUsernameAlreadyExists) {
      return res.status(400).json({
        message: "Username  Already registerd",
      });
    }

    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
      return res.status(400).json({
        message: "User email Already registerd",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: false,
    });

    return res.status(201).json({
      message: "user Registerd Sucessfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: `Register error: ${error.message}`,
    });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "Invalid email id",
    });
  }

  const isPassword = await bcrypt.compare(password, user.password);

  if (!isPassword) {
    return res.status(400).json({
      message: "Invalid  Password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "Strict",
    secure: false,
  });

  res.status(200).json({
    message: "User Logedin Sucessfully",
    user,
  });
}
async function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out Sucessfully",
  });
}

module.exports = { registerUser, loginUser, logoutUser };
