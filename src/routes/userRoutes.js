const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.js');
const { isLoggedIn, isAdmin } = require('../middlewares/authMiddleware.js');

// GET all users
router.get('/', isLoggedIn, isAdmin, userController.getUsers);

// GET user by ID
router.get('/:id', userController.getUserById);

// GET user by username
router.get('/username/:username', userController.getUserByUsername);

// CREATE new user
router.post('/', isLoggedIn, isAdmin, userController.createUser);

// UPDATE user
router.put('/:id', isLoggedIn, userController.updateUser);

// DELETE user
router.delete('/:id', isLoggedIn, isAdmin, userController.deleteUser);

// Login and Logout routes
router.post('/login', userController.loginUser);
router.post('/logout', isLoggedIn, userController.logoutUser);

// Login as admin
router.post('/loginAdmin', userController.loginAdmin);


module.exports = router;
