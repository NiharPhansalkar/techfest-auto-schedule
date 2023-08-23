const express = require("express");
const teamsController = require("../controllers/teamsController");

const router = express.Router();

router.post("/register", teamsController.registerTeam);

module.exports = router;
