const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  console.log(bearerHeader);
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    jwt.verify(bearerToken, 'secretkey', (err, authData) => {
      if (err) res.sendStatus(403);
      else {
        req.authData = authData;
        next();
      }
    });
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = {verifyToken};
