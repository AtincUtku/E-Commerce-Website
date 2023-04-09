const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;
const { connectDb } = require('./src/config/db.js');
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const itemRoutes = require('./src/routes/itemRoutes.js');
// Use routes
app.use('/items', itemRoutes);


// Set up routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});







app.listen(port, () => console.log(`Example app listening on port ${port}!`));


