const express = require("express");
const teamsController = require("../controllers/teamsController");

const router = express.Router();

router.post("/register", teamsController.registerTeam);
router.get("/latestTime", teamsController.getPlayingTeams);
router.get("/allTeams", teamsController.getAllTeams);
router.put("/reschedule/:teamId", teamsController.updateTeamTimestamp);
router.get("/deleteTeam", teamsController.deleteTeam);

module.exports = router;
