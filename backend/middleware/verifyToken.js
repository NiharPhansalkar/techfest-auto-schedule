const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
    const token = req.cookies.jwtToken;

    if (!token) {
        return res.status(401).json({ isValidToken: false });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ isValidToken: false });
      }

      req.username = decoded.username;
      next();
    })
}
