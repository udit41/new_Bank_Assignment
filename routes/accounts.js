const express = require("express");
const { withdraw, deposit } = require("../controller/accounts");
const { isAuthenticated, isSignedIn } = require("../controller/auth");
const { getUserById } = require("../controller/user");

const router = express.Router();

router.param("userId", getUserById);

router.post("/withdraw/:userId", isSignedIn, isAuthenticated, withdraw);
router.post("/deposit/:userId", isSignedIn, isAuthenticated, deposit);

module.exports = router;
