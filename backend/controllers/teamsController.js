const Team = require("../models/TeamModel");

module.exports = {
    registerTeam: async (req, res) => {
        try {
            const { teamName, member1, member2, member3, member4, userEmail } = req.body;

            const playTime = 15; // 15 mins
            const playTimeMilli = playTime * 60 * 1000; // 15 mins converted to milliseconds
            const bufferTime = 10 * 60 * 1000; // 10 mins converted to milliseconds
      
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

            const currentTimestamp = Date.now();

            // Find the maximum timestamp of all teams by sorting in descending order
            const maxTimestampTeam = await Team.findOne({}, {}, { sort: { timestamp: -1 } });

            let nextTeamTimestamp;

            if (maxTimestampTeam && maxTimestampTeam._id.toString() !== savedTeam._id.toString()) {
                // Calculate next team timestamp based on maxTimestampTeam's playtime + buffer
                const maxTeamTimestamp = maxTimestampTeam.timestamp.getTime();
                nextTeamTimestamp = maxTeamTimestamp + playTimeMilli + bufferTime;
            } else {
                // For none or one team in the queue
                nextTeamTimestamp = currentTimestamp + bufferTime;
            }

            await Team.updateOne({ _id: savedTeam._id }, { $set: { timestamp: new Date(nextTeamTimestamp) } });

            const formattedNextTeamTimestamp = new Date(nextTeamTimestamp).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

            res.json({
                teamName: savedTeam.teamName,
                timestamp: formattedNextTeamTimestamp
            });
        } catch (error) {
            res.status(500).json({ error: "Failed to create a new team" });
        }
    },
};

