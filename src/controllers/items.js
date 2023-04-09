const { connectDb } = require('../database/db.js');
const Item = require('../models/item');

// GET all items
async function getItems(req, res) {
  try {
    const db = await connectDb();
    const items = await db.collection('Items').find().toArray();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// GET item by id
async function getItemById(req, res) {
  try {
    const db = await connectDb();
    const item = await db.collection('Items').findOne({ _id: req.params.id });
    if (!item) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      res.status(200).json(item);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// CREATE new item
async function createItem(req, res) {
  try {
    const { name, description, price, currency, seller, image, size, colour, spec, rating, reviews, category } = req.body;
    const item = new Item(name, description, price, currency, seller, image, size, colour, spec, rating, reviews, category);
    const db = await connectDb();
    const result = await db.collection('Items').insertOne(item);
    res.status(201).json({ message: 'Item created', item });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// UPDATE item
async function updateItem(req, res) {
  try {
    const db = await connectDb();
    const item = await db.collection('Items').findOne({ _id: req.params.id });
    if (!item) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      const { name, description, price, currency, seller, image, size, colour, spec, rating, reviews, category } = req.body;
      const updatedItem = new Item(name, description, price, currency, seller, image, size, colour, spec, rating, reviews, category);
      updatedItem._id = item._id; // Preserve the original item ID
      await db.collection('Items').replaceOne({ _id: item._id }, updatedItem);
      res.status(200).json({ message: 'Item updated', item: updatedItem });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// DELETE item
async function deleteItem(req, res) {
  try {
    const db = await connectDb();
    const result = await db.collection('Items').deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      res.status(200).json({ message: 'Item deleted' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
};
