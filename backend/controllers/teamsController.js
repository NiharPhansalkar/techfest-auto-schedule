const Team = require("../models/TeamModel");

module.exports = {
    registerTeam: async (req, res) => {
        try {
            const { teamName, member1, member2, member3, member4, userEmail } = req.body;
      
            const newTeamData = {
                teamName,
                member1,
                member2,
                userEmail,
            };

            if (member3) {
                newTeamData.member3 = member3;
            }
      
            if (member4) {
                newTeamData.member4 = member4;
            }

            const newTeam = new Team(newTeamData);
            const savedTeam = await newTeam.save();
            res.json(savedTeam);
        } catch (error) {
            res.status(500).json({ error: "Failed to create a new team" });
        }
    },
};

