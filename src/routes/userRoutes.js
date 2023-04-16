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
router.post('/login',jsonParser, userController.loginUser);
router.post('/logout', isLoggedIn, userController.logoutUser);

// Login as admin
router.post('/loginAdmin', userController.loginAdmin);

router.get('/:id/reviews',isLoggedIn, userController.getUserReviews);


module.exports = router;
