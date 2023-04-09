const express = require('express');
const router = express.Router();
const itemController = require('../controllers/items.js');

// GET all items 
router.get('/', itemController.getItems);

// GET all items in category
router.get('/category/:category', itemController.getItemsByCategory);

// GET item by id
router.get('/:id', itemController.getItemById);

// CREATE new item
router.post('/', itemController.createItem);

// UPDATE item
router.put('/:id', itemController.updateItem);

// DELETE item
router.delete('/:id', itemController.deleteItem);

module.exports = router;
