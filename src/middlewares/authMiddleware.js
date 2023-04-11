const User = require('../models/user.js');

const isLoggedIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user && user.loggedIn) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ error: 'User not logged in' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user && user.isAdmin) {
      req.user = user;
      next();
    } else {
      res.status(403).json({ error: 'User is not an admin' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  isLoggedIn,
  isAdmin,
};
