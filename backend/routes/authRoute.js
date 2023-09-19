const express = require("express");
const authController = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/authenticate", authController.authenticateUser);
router.post("/validtoken", verifyToken, authController.validToken);

module.exports = router;
