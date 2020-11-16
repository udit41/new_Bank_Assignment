const express = require("express");
const { isSignedIn, isAuthenticated, isBanker } = require("../controller/auth");
const {
  getUserById,
  getUser,
  getAllUsers,
  getMyTrans,
  getUserTrans,
} = require("../controller/user");

const router = express.Router();

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

router.get(
  "/users/:userId",
  isSignedIn,
  isBanker,
  isAuthenticated,
  getAllUsers
);

router.get("/getAllTrans/:userId", isSignedIn, isAuthenticated, getMyTrans);
router.get("/getUserTrans/:userId", getUserTrans);

module.exports = router;
