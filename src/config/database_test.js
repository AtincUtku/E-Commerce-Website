// This script is used to see whether the database is connected or not. If it is connected, it will insert a new item to the database.
const { connectDb } = require('./db.js');

async function main() {
  const client = await connectDb();
  const collection = client.db("ceng495_hw1").collection("Items");

  await collection.insertOne({
    name: "Product A",
    category: "Clothing",
    price: 19.99
  });

  console.log("Insertion successful!");

  await client.close();
}

main().catch((err) => console.error(err));
