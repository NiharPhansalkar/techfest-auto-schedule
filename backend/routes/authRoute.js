const express = require("express");
const authController = require("../controllers/authController");
const tokenController = require("../controllers/tokenController");
const router = express.Router();

router.post("/authenticate", authController.authenticateUser);
router.get("/validtoken", tokenController.validToken);

module.exports = router;
