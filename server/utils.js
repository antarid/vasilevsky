const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    try {
      const authData = jwt.verify(bearerToken, 'secretkey');
      req.authData = authData;
      next();
    } catch (e) {
      res.sendStatus(403);
    }
    // jwt.verify(bearerToken, 'secretkey', (err, authData) => {
    //   if (err) res.sendStatus(403);
    //   else {
    //     req.authData = authData;
    //     next();
    //   }
    // });
  } else {
    res.sendStatus(403);
  }
};

module.exports = {verifyToken};
