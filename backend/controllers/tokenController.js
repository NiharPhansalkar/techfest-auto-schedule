const verifyToken = require("../middleware/verifyToken");
module.exports = {
  validToken: (req, res) => {
    res.status(200).json({ isValidToken: true });
  }
}
