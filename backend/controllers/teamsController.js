const Team = require("../models/TeamModel");

module.exports = {
    registerTeam: async (req, res) => {
        try {
            const { teamName, members, userEmail, timestamp } = req.body;

            const memberNames = members.map(member => member.name);

            const [member1, member2, member3, member4] = memberNames;

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
    getAllTeams: async (req, res) => {
      try {
        const allTeams = await Team.find().sort({ timestamp: 1 });

        res.status(200).json({ allTeams });
      } catch (error) {
        res.status(500).json({ error: "Failed to get all teams" });
      }
    },
    updateTeamTimestamp: async (req, res) => {
      const { teamId } = req.params;
      const { newTimestamp } = req.body;
     
      try {
        const team = await Team.findById(teamId);

        if (!team) {
          return res.status(404).json({ error: "Team not found" });
        }

        team.timestamp = newTimestamp;

        await team.save();

        res.json({ message: 'Timestamp updated successfully', updatedTeam: team });
      } catch (error) {
        res.status(500).json({ error: 'Failed to update timestamp' });
      }
    },
    deleteTeam: async (req, res) => {
      const { teamId } = req.body;
      
      try {
        await Team.deleteOne({ _id: teamId })
        res.status(200).json({ message: 'Successfully deleted' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete a team' });
      }
    },
};

