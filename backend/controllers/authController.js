const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

module.exports = {
  authenticateUser: (req, res) => {
    const { username, password } = req.body;
    
    if (username === process.env.USERNAME) {
      bcrypt.compare(password, process.env.PASSWORD, (err, result) => {
        if (err) {
          res.status(500).json({ message: "Server error" });
        }
        if (result) {
          const token = jwt.sign({ username: username }, secretKey, {
            expiresIn: '1h',
          });
          
          res.cookie('jwtToken', token, {
            httpOnly: true,
          });
          
          res.status(200).json({ message: "Authentication Successful" });
        } else {
          res.status(401).json({ message: "Authentication Unsuccessful" });
        }
      });
    } else {
          res.status(401).json({ message: "Authentication Unsuccessful" });
    }
  },
}
