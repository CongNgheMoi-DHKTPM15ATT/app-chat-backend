const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"]

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, encoded) => {
      if (err) {
        console.log(err);
        res.status(401).json({ "mess": "Unauthorized access." });
      }

      console.log(`encode: ${encoded}`);
      req.encoded = encoded;

      next();
    });
  } else {
    res.status(403).json({ "mess": "Forbidden response" });
  }
}

module.exports = verifyToken;