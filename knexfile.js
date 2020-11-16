module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "localhost",
      user: "root",
      password: "",
      database: "demo",
    },
  },
  migrations: {
    tableName: "users_and_accounts",
  },
};
