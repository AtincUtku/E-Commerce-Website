const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const userController = require('../controllers/users.js');
const { isLoggedIn, isAdmin } = require('../middlewares/authMiddleware.js');


// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// GET all users
router.get('/', isLoggedIn, isAdmin, userController.getUsers);

// GET user by ID
router.get('/:id', isLoggedIn, userController.getUserById);

// GET user by username
router.get('/username/:username', isLoggedIn, userController.getUserByUsername);

// CREATE new user
router.post('/', jsonParser, isLoggedIn, isAdmin, userController.createUser);

// UPDATE user
router.put('/:id', isLoggedIn, userController.updateUser);

// DELETE user
router.delete('/', jsonParser, isLoggedIn, isAdmin, userController.deleteUserByName);

// Login and Logout routes
router.post('/login',jsonParser, userController.loginUser);
router.post('/logout', isLoggedIn, userController.logoutUser);



router.get('/:id/reviews',isLoggedIn, userController.getUserReviews);


module.exports = router;
