require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const knex = require("./db/knex");
const app = express();
const authroutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const accountsRoutes = require("./routes/accounts");
const path = require("path");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", authroutes);
app.use("/api", userRoutes);
app.use("/api", accountsRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`The server is up and running`);
});
