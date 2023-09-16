const Team = require("../models/TeamModel");

module.exports = {
    registerTeam: async (req, res) => {
        try {
            const { teamName, member1, member2, member3, member4, userEmail, timestamp } = req.body;

            const newTeamData = {
                teamName,
                member1,
                member2,
                userEmail,
                timestamp,
            };

            if (member3) {
                newTeamData.member3 = member3;
            }
      
            if (member4) {
                newTeamData.member4 = member4;
            }

            const newTeam = new Team(newTeamData);
            const savedTeam = await newTeam.save();
            res.json({
                teamName: savedTeam.teamName,
            });
        } catch (error) {
            res.status(500).json({ error: "Failed to create a new team" });
        }
    },
    getPlayingTeams: async (req, res) => {
        try {
            const currentTime = Date.now();
            const latestTeam = await Team.findOne({ timestamp: { $gt: currentTime } }).sort({ timestamp: -1 }).limit(1);

            if (latestTeam) {
                res.json({ latestTimestamp: latestTeam.timestamp });
            } else {
                res.json({ latestTimestamp: null });
            }
        } catch (error) {
            res.status(500).json({ error: "Failed to get playing teams" });
        }
    },
};

