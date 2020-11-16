exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id");
      table.string("first_name");
      table.string("last_name");
      table.string("email", 128);
      table.string("role").defaultTo("customer");
      table.string("encry_password");
      table.bigInteger("balance").defaultTo(0);
      table.timestamps();
    })
    .createTable("accounts", (table) => {
      table.increments("id");
      table.bigInteger("amount");
      table.string("transaction_type");
      table.integer("user_id").unsigned().references("users.id");
      table.timestamps();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users").dropTable("accounts");
};
