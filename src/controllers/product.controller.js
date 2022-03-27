const express = require("express");

const router = express.Router();

const Product = require("../models/product.model");

const authenticate = require("../middlewares/authenticate");

const authorise = require("../middlewares/authorise");

router.post("", authenticate, async (req, res) => {
  req.body.user_id = req.user._id;
  try {
    const product = await Product.create(req.body);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

router.patch("/:id", authenticate,authorise(["amdin","seller"]), async (req, res) => {
  console.log("hello modification")
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(product)
    return res.status(200).send(product);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

router.get("", async (req, res) => {
  try {
    const product = await Product.find();
    return res.status(200).send(product);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

module.exports = router;
