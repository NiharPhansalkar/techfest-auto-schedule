const express = require("express");
const teamsController = require("../controllers/teamsController");

const router = express.Router();

router.post("/register", teamsController.registerTeam);
router.get("/latestTime", teamsController.getPlayingTeams);

module.exports = router;
