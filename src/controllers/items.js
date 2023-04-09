const { connectDb } = require("../config/db.js");
const Item = require('../models/item');
const { ObjectId } = require('mongodb');

// GET all items 
async function getItems(req, res) {
  try {
    const client = await connectDb();
    const items = await client.db("ceng495_hw1").collection('Items').find().toArray();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// GET all items in category
async function getItemsByCategory(req, res) {
  try {
    const client = await connectDb();
    const query = {category: req.params.category};
    console.log(query);
    const collection = await client.db("ceng495_hw1").collection("Items");
    console.log("after collection");
    const items = await collection.find(query).toArray();
    console.log(items);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// GET item by id
async function getItemById(req, res) {
  try {
    const client = await connectDb();
    console.log("connected to db");
    console.log('req.params.id:', req.params.id);
    const query = { _id: new ObjectId(req.params.id) };
    console.log("query:", query);
    
    const collection = await client.db("ceng495_hw1").collection('Items');
    console.log("collection:", collection);
    
    const item = await collection.findOne(query);
    
    console.log(item);
    if (!item) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        console.log("item found");
        res.status(200).json(item);
      }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ Error: error });
  }
}



// CREATE new item
async function createItem(req, res) {
  try {
    const { name, description, price, currency, seller, image, size, colour, spec, rating, reviews, category } = req.body;
    const item = new Item(name, description, price, currency, seller, image, size, colour, spec, rating, reviews, category);
    const client = await connectDb();
    const result = await client.db("ceng495_hw1").collection('Items').insertOne(item);
    res.status(201).json({ message: 'Item created', item });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// UPDATE item
async function updateItem(req, res) {
  try {
    const client = await connectDb();
    const item = await client.db("ceng495_hw1").collection('Items').findOne({ _id: req.params.id });
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
    const client = await connectDb();
    const result = await client.db("ceng495_hw1").collection('Items').deleteOne({ _id: req.params.id });
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
  getItemsByCategory,
  getItemById,
  createItem,
  updateItem,
  deleteItem
};
