const { connectDb } = require("../config/db.js");
const Item = require('../models/item.js');
const User = require('../models/user.js');
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
    const item = await client.db("ceng495_hw1").collection('Items').findOne({ _id: new ObjectId(req.params.id) });
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
    const result = await client.db("ceng495_hw1").collection('Items').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      res.status(200).json({ message: 'Item deleted' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Add review to an item
async function addReview(req, res) {
  try {
    const client = await connectDb();
    const { itemId, rating, comment } = req.body;
    const username = req.user.username;
    const query = { _id: new ObjectId(itemId) };
    const item = await client.db("ceng495_hw1").collection('Items').findOne(query);
    const user = await client.db("ceng495_hw1").collection('Users').findOne({ username });

    if (!item || !user) {
      res.status(404).json({ error: 'Item or user not found' });
    } else {
      const review = {
        username,
        rating,
        comment,
      };

      item.reviews.push(review);
      user.reviews.push({ item: itemId, ...review });

      // Update user's average rating
      user.averageRating = user.reviews.reduce((acc, r) => acc + r.rating, 0) / user.reviews.length;

      await client.db("ceng495_hw1").collection('Items').replaceOne(query, item);
      await client.db("ceng495_hw1").collection('Users').replaceOne({ username }, user);

      res.status(200).json({ message: 'Review added', review });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Update review for an item
async function updateReview(req, res) {
  try {
    const { itemId, reviewId, username, rating, comment } = req.body;
    const itemQuery = { _id: new ObjectId(itemId) };

    const client = await connectDb();
    const item = await client.db("ceng495_hw1").collection('Items').findOne(itemQuery);
    const user = await client.db("ceng495_hw1").collection('Users').findOne({ username });

    if (!item || !user) {
      res.status(404).json({ error: 'Item or user not found' });
    } else {
      const itemReviewIndex = item.reviews.findIndex((review) => review._id.toString() === reviewId);
      const userReviewIndex = user.reviews.findIndex((review) => review._id.toString() === reviewId);

      if (itemReviewIndex !== -1 && userReviewIndex !== -1) {
        item.reviews[itemReviewIndex].rating = rating;
        item.reviews[itemReviewIndex].comment = comment;
        user.reviews[userReviewIndex].rating = rating;
        user.reviews[userReviewIndex].comment = comment;

        // Update user's average rating
        user.averageRating = user.reviews.reduce((acc, r) => acc + r.rating, 0) / user.reviews.length;

        await client.db("ceng495_hw1").collection('Items').replaceOne(itemQuery, item);
        await client.db("ceng495_hw1").collection('Users').replaceOne({ username }, user);

        res.status(200).json({ message: 'Review updated' });
      } else {
        res.status(404).json({ error: 'Review not found' });
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Delete review for an item
async function deleteReview(req, res) {
  try {
    const { itemId, reviewId, username } = req.body;
    const itemQuery = { _id: new ObjectId(itemId) };

    const client = await connectDb();
        const item = await client.db("ceng495_hw1").collection('Items').findOne(itemQuery);
    const user = await client.db("ceng495_hw1").collection('Users').findOne({ username });

    if (!item || !user) {
      res.status(404).json({ error: 'Item or user not found' });
    } else {
      const itemReviewIndex = item.reviews.findIndex((review) => review._id.toString() === reviewId);
      const userReviewIndex = user.reviews.findIndex((review) => review._id.toString() === reviewId);

      if (itemReviewIndex !== -1 && userReviewIndex !== -1) {
        item.reviews.splice(itemReviewIndex, 1);
        user.reviews.splice(userReviewIndex, 1);

        // Update user's average rating
        user.averageRating = user.reviews.length === 0 ? 0 : user.reviews.reduce((acc, r) => acc + r.rating, 0) / user.reviews.length;

        await client.db("ceng495_hw1").collection('Items').replaceOne(itemQuery, item);
        await client.db("ceng495_hw1").collection('Users').replaceOne({ username }, user);

        res.status(200).json({ message: 'Review deleted' });
      } else {
        res.status(404).json({ error: 'Review not found' });
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Rate item
async function rateItem(req, res) {
  try {
    const client = await connectDb();
    const item = await client.db("ceng495_hw1").collection('Items').findOne({ _id: new ObjectId(req.params.id) });
    if (!item) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      const userId = req.user._id;
      const rating = req.body.rating;

      // Update user's rating for the item
      const existingRatingIndex = item.ratings.findIndex(r => r.userId.toString() === userId.toString());
      if (existingRatingIndex > -1) {
        item.ratings[existingRatingIndex].rating = rating;
      } else {
        item.ratings.push({ userId, rating });
      }

      // Update the item's average rating
      item.rating = item.ratings.reduce((acc, r) => acc + r.rating, 0) / item.ratings.length;

      // Find user
      const user = await client.db("ceng495_hw1").collection('Users').findOne({ _id: userId });

      // Update user's average rating
      const totalRatings = user.reviews.length + (existingRatingIndex > -1 ? 0 : 1);
      const newRatingTotal = user.averageRating * user.reviews.length + rating;
      user.averageRating = newRatingTotal / totalRatings;

      await client.db("ceng495_hw1").collection('Users').replaceOne({ _id: userId }, user);
      await client.db("ceng495_hw1").collection('Items').replaceOne({ _id: item._id }, item);
      res.status(200).json({ message: 'Item rated', item });
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
  deleteItem,
  addReview,
  updateReview,
  deleteReview,
  rateItem,
};

