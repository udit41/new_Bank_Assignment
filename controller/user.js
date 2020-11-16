const knex = require("../db/knex");

exports.getUserById = (req, res, next, id) => {
  knex("users")
    .where("id", id)
    .then((user) => {
      if (user.length == 0) {
        return res.status(400).json({
          error: "User Not Found",
        });
      }
      req.profile = user;
      next();
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getUser = (req, res) => {
  req.profile.encry_password = undefined;
  req.profile.created_at = undefined;
  return res.json(req.profile);
};

exports.getAllUsers = (req, res) => {
  knex("users")
    .then((user) => {
      return res.json(user);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getMyTrans = (req, res) => {
  knex("accounts")
    .where("user_id", req.profile[0].id)
    .orderBy("id", "DESC")
    .then((trans) => {
      if (trans.length == 0) {
        return res.status(400).json({
          error: "No Transactions!!",
        });
      }
      return res.json(trans);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUserTrans = (req, res) => {
  knex("accounts")
    .where("user_id", req.profile[0].id)
    .orderBy("id", "DESC")
    .then((trans) => {
      if (trans.length == 0) {
        return res.status(400).json({
          error: "No Transactions!!",
        });
      }
      return res.json(trans);
    })
    .catch((err) => {
      console.log(err);
    });
};
