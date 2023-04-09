const { MongoClient, ServerApiVersion } = require('mongodb');


const uri = "mongodb+srv://autkualparslan:ceng495@cluster0.rimtyuu.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1,});

async function connectDb() {
    if (!client.isConnected) {
      await client.connect();
    }
    return client;
  }
  
  module.exports = { connectDb };