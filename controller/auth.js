const { check, validationResult } = require("express-validator");
const knex = require("../db/knex");
const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const { first_name, last_name, email, password } = req.body;

  knex("users")
    .where("email", email)
    .then(async (user) => {
      if (user.length > 0) {
        return res.status(400).json({
          message: "Email Alresdy registered!",
        });
      }
      const encry_password = await bcrypt.hash(password, 8);

      knex("users")
        .insert({ first_name, last_name, email, encry_password })
        .then((user_id) => {
          knex("users")
            .where("id", user_id)
            .then((data) => {
              res.json(data);
            });
        });
    });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Please provide Email and Password",
    });
  }

  knex("users")
    .where("email", email)
    .then(async (user) => {
      if (!user || !(await bcrypt.compare(password, user[0].encry_password))) {
        return res.status(401).json({
          error: "Please enter correct credentials!!",
        });
      }

      const { id, first_name, last_name, email, role, balance } = user[0];

      const token = jwt.sign({ id }, process.env.SECRET);

      res.cookie("token", token, {
        expire: Math.floor(Date.now() / 1000) + 60 * 60,
      });

      return res.json({
        token,
        user: { id, first_name, last_name, email, role, balance },
      });
    });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    msg: "User loggedOut Successfully",
  });
};

exports.isSignedIn = expressjwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

exports.isBanker = (req, res, next) => {
  if (req.profile[0].role != "banker") {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile[0].id === req.auth.id;
  if (!checker) {
    return res.status(400).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};
