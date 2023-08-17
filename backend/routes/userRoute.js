const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
  applyForPlan,
} = require("../controllers/userController");
const protect = require("../middleWare/authMiddleware");
const isAdmin = require("../middleWare/isAdminMiddleware")

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", protect, logoutUser);
router.get("/getUser", protect, getUser);
router.get("/loggedin", loginStatus);
//Send user.id in req.params and Plan in req.body
router.post('/applyForPlan', protect, applyForPlan);

module.exports = router;
