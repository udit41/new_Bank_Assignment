exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("accounts")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("accounts").insert([
        { id: 1, amount: 01, transaction_type: "deposit", user_id: 1 },
      ]);
    });
};
