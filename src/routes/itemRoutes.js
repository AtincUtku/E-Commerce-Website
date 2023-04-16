const express = require('express');
const router = express.Router();
const itemController = require('../controllers/items.js');
const { isLoggedIn, isAdmin } = require('../middlewares/authMiddleware.js');
const bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// GET all items 
router.get('/', itemController.getItems);

// GET all items in category
router.get('/category/:category', itemController.getItemsByCategory);

// GET item by id
router.get('/:id', itemController.getItemById);



// CREATE new item (only admin)
router.post('/', isLoggedIn, isAdmin, itemController.createItem);

// UPDATE item
router.put('/:id', isLoggedIn, itemController.updateItem);

// DELETE item (only admin)
router.delete('/:id', isLoggedIn, isAdmin, itemController.deleteItem);

// Rate item (only logged-in users)
router.post('/:id/rate', isLoggedIn, itemController.rateItem);

// Add review to an item (only logged-in users)
router.post('/:id/addReview', jsonParser, isLoggedIn, itemController.addReview);

// Update review for an item (only logged-in users)
router.put('/:id/updateReview', isLoggedIn, itemController.updateReview);

// Delete review for an item (only logged-in users)
router.delete('/:id/deleteReview', isLoggedIn, itemController.deleteReview);


module.exports = router;
