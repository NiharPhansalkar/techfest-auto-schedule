const brcypt = require('bcrypt');
const jwt = require('jwt');
const cookieParser = require('cookie-parser');

module.exports = {
    authenticateUser: async (req, res) => {
      const secretKey = process.env.SECRET_KEY;
      const { username, password } = req.body;
      
      if (
        username === process.env.USERNAME
        &&
          bcrypt.compare(password, process.env.PASSWORD, (err, result) => {
            if (result) {
              const token = jwt.sign({ username: username }, secretKey, {
                expiresIn: '1h',
              });
              
              res.cookie('jwtToken', token, {
                httpOnly: true,
              });
              
              res.status(200).json({ message: "Authentication Successful" });
            }
          })
      )
    }
}
