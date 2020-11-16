const knex = require("../db/knex");

exports.getTransactionById = (req, res, next, id) => {
  knex("accounts")
    .where("id", id)
    .then((trans) => {
      if (trans.length == 0) {
        return res.status(400).json({
          error: "No Transaction found!",
        });
      }
      req.transaction = trans;
      next();
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getTransaction = (req, res) => {
  return res.json(req.transaction);
};

exports.withdraw = (req, res) => {
  const user_id = req.profile[0].id;
  const transaction_type = "withdraw";
  const amount = req.body.amount;

  if (req.profile[0].balance < req.body.amount) {
    return res.status(400).json({
      error: "Insufficient Balance",
    });
  }

  const newBal = req.profile[0].balance - req.body.amount;

  knex("users")
    .update({ balance: newBal })
    .where("id", user_id)
    .then((user) => {
      if (user.length == 0) {
        return res.status(400).json({
          error: "Unable to Withdraw",
        });
      }
      knex("accounts")
        .insert({ amount, user_id, transaction_type })
        .then((trans) => {
          if (trans.length == 0) {
            return res.status(400).json({
              error: "Transaction Error!",
            });
          }
          res.json(trans);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.deposit = (req, res) => {
  const user_id = req.profile[0].id;
  const transaction_type = "deposit";
  const amount = parseInt(req.body.amount);

  const newBal = req.profile[0].balance + amount;

  knex("users")
    .update({ balance: newBal })
    .where("id", user_id)
    .then((user) => {
      if (user.length == 0) {
        return res.status(400).json({
          error: "Unable to deposit",
        });
      }
      knex("accounts")
        .insert({ amount, user_id, transaction_type })
        .then((trans) => {
          if (trans.length == 0) {
            return res.status(400).json({
              error: "Transaction Error!",
            });
          }
          res.json(trans);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};
