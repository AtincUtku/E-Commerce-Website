const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed. No token provided.' });
  }
  const secret = "my_jwt_secret";
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
    }
    req.user = decoded;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Access denied. Insufficient privileges.' });
  }
  next();
};
