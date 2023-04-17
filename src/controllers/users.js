const { connectDb } = require("../config/db.js");
const Item = require('../models/item.js');
const User = require('../models/user.js');
const { ObjectId } = require('mongodb');
const  jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// GET all users
async function getUsers(req, res) {
  try {
    const client = await connectDb();
    const users = await client.db("ceng495_hw1").collection('Users').find().toArray();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// GET user by username
async function getUserByUsername(req, res) {
  try {
    const client = await connectDb();
    const user = await client.db("ceng495_hw1").collection('Users').findOne({ username: req.params.username });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// GET user by id
async function getUserById(req, res) {
  try {
    const client = await connectDb();
    const user = await client.db("ceng495_hw1").collection('Users').findOne({ _id: new ObjectId(req.params.id) });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// CREATE new user
async function createUser(req, res) {
  try {
    const { username, password } = req.body;
    const loggedIn = false;

    const hashedPassword = await bcrypt.hash(password, 10); // 2. Hash the password

    const user = {
      username,
      password: hashedPassword,
      isAdmin,
      average_rating: 0,
      reviews: []
    };
    const client = await connectDb();
    const result = await client.db("ceng495_hw1").collection('Users').insertOne(user);
    res.status(201).json({ message: 'User created', user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// UPDATE user
async function updateUser(req, res) {
  try {
    const client = await connectDb();
    const user = await client.db("ceng495_hw1").collection('Users').findOne({ _id: new ObjectId(req.params.id) });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      const { username, isAdmin, loggedIn, averageRating, reviews } = req.body;
      user.username = username;
      user.isAdmin = isAdmin;
      user.loggedIn = loggedIn;
      user.averageRating = averageRating;
      user.reviews = reviews;
      await client.db("ceng495_hw1").collection('Users').replaceOne({ _id: user._id }, user);
      res.status(200).json({ message: 'User updated', user });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// DELETE user
async function deleteUser(req, res) {
  try {
    const client = await connectDb();
    const result = await client.db("ceng495_hw1").collection('Users').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json({ message: 'User deleted' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// GET user's reviews
async function getUserReviews(req, res) {
    try {
      const client = await connectDb();
      const user = await client.db("ceng495_hw1").collection('Users').findOne({ _id: new ObjectId(req.params.id) });
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json(user.reviews);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
// LOGIN user
async function loginUser(req, res) {
  try {
    const client = await connectDb();
    const user_name = req.body.username;
    const password = req.body.password;
    const user = await client.db("ceng495_hw1").collection('Users').findOne({ username: user_name});
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password); // 3. Verify the password

      if (!isPasswordValid) {
        res.status(401).json({ error: 'Invalid password' });
        return;
      } else {
        const payload = { userId: user._id, username: user.username, isAdmin: user.isAdmin };
        const secret = 'my_jwt_secret';
        const options = { expiresIn: 25200 };
      
        const token = jwt.sign(payload, secret, options);
      
        res.status(200).json({ message: 'User logged in successfully.', token, userId: user._id, username: user.username });
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
  
// LOGOUT user
async function logoutUser(req, res) {
  try {
    res.status(200).json({ message: 'User logged out' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
    

// LOGIN admin
async function loginAdmin(req, res) {
  try {
    const client = await connectDb();
    const admin = await client.db("ceng495_hw1").collection('Users').findOne({ username: req.body.username });

    if (!admin || !admin.isAdmin) {
      res.status(404).json({ error: 'Admin not found' });
    } else {
      const token = jwt.sign({ userId: admin._id, username: admin.username, isAdmin: admin.isAdmin }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      res.status(200).json({ message: 'Admin logged in successfully.', token });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

  module.exports = {
    getUsers,
    getUserByUsername,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserReviews,
    loginUser,
    logoutUser,
    loginAdmin,
  };
  