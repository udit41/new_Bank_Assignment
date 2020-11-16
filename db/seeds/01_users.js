exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        {
          id: 1,
          first_name: "Admin_demo",
          last_name: "demo",
          email: "abc@gmail.com",
          role: "customer_demo",
          password: "1234",
          balance: 0,
        },
      ]);
    });
};
