const express = require("express");
const { signup, signin, signout } = require("../controller/auth");
const knex = require("../db/knex");
const router = express.Router();
const { check, validationResult } = require("express-validator");

router.post(
  "/signup",
  [
    check("first_name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 character long"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password must be atlest 5 character long"),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email")
      .isEmail()
      .withMessage("Please provide a proper email address"),
    check("password").isLength({ min: 1 }).withMessage("Password is required"),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
