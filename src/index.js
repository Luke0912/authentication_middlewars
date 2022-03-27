const express = require("express");

const userController = require("./controllers/user.controller");

const productController = require("./controllers/product.controller");

const { register, login,newToken } = require("./controllers/auth.controller");

const passport = require("./configs/google-oauth");
const { rawListeners } = require("./models/user.model");

const app = express();

app.use(express.json());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    // successRedirect: "/auth/google/success",
    failureRedirect: "/login",
    session:false,
  }),
  function (req, res) {
    const token = newToken(req.user);
    return res.status(200).send({user:req.user,token})
  }
);

app.use("/users", userController);

app.post("/register", register);

app.post("/login", login);

app.use("/products", productController);

module.exports = app;


// JWT_SECRET_KEY="masaisecret"
// GOOGLE_CLIENT_ID=494128726561-ge7adqehfq6fkdqfdsuraqinnmhqlb0k.apps.googleusercontent.com
// GOOGLE_CLIENT_SECRET=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