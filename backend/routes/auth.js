const express = require("express");
const passport = require("passport");
const authRouter = express.Router();
const { User } = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");

authRouter.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

authRouter.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.user.emails[0].value });
    if (user) res.redirect(process.env.CLIENT_URL);
  })
),
  authRouter.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
  });

module.exports = authRouter;
