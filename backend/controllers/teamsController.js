const Team = require("../models/TeamModel");

module.exports = {
    registerTeam: async (req, res) => {
        try {
            const { teamName, member1, member2, member3, member4, userEmail } = req.body;

            const playTime = 15; // 15 mins 
            const playTimeMilli = 15 * 60 * 1000; // 15 mins converted to milliseconds
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

            const fifteenMinsAgo = new Date();
            fifteenMinsAgo.setMinutes(fifteenMinsAgo.getMinutes() - playTime);
            const queue = await Team.find({ timestamp: { $gt: fifteenMinsAgo } });

            let maxTimestamp = 0;

            for (const team of queue) {
                let teamTimestamp = team.timestamp.getTime();
                if (teamTimestamp > maxTimestamp) {
                    maxTimestamp = teamTimestamp;
                }
            }

            let queueTimestamp;

            if (maxTimestamp === 0) {
                queueTimestamp = Date.now() + bufferTime;
            } else {
                queueTimestamp = maxTimestamp + playTimeMilli + bufferTime;
            }

            await Team.updateOne({ _id: savedTeam._id }, { $set: { timestamp: new Date(queueTimestamp) } });

            const formattedTimestamp = new Date(queueTimestamp).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

            res.json({
                teamName: savedTeam.teamName,
                timestamp: formattedTimestamp
            });
        } catch (error) {
            res.status(500).json({ error: "Failed to create a new team" });
        }
    },
};

