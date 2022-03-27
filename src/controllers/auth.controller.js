// const express = require("express")

const User = require("../models/user.model");

const jwt = require("jsonwebtoken");
const { exists } = require("../models/user.model");

require("dotenv").config();

const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

//crearing a token with out external lib but it will be not be as seccured

// const newToken =(user)=>{
//     return user._id+"xyz"
// }

const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log(user);

    //checking email
    if (user) {
      return res.status(400).send({ message: "Email already exists" });
    }
    console.log(user);

    //if new user, registered
    user = await User.create(req.body);
    console.log(user);

    const token = newToken(user);
    return res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    //checked if mail exists
    if (!user) {
      return res.status(400).send("wrong Email or password");
    }

    // if email exists,check password
    const match = user.checkPassword(req.body.password);

    //if it doesent matches
    if (!match) {
      return res.status(400).send({ message: "wrong or password" });
    }
    //if it matches
    const token = newToken(user);
    return res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = { login, register ,newToken};
