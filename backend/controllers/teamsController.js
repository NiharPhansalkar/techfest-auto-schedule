const Team = require('../models/TeamModel');

module.exports = {
  createTeam: async (req, res) => {
    try {
      const { team-name, member-one, member-two, member-three, member-four, user-email } = req.body;
      
      const newTeamData = {
        team-name,
        member-one,
        member-two,
      };

      if (member-three) {
        newTeamData.member-three = member-three;
      }
      
      if (member-four) {
        newTeamData.member-four = member-four;
      }

      const newTeam = new Team(newTeamData);
      const savedTeam = await newTeam.save();
      res.json(savedTeam);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create a new team' });
    }
  },
};

