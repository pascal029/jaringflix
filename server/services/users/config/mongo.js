const { MongoClient } = require("mongodb");
const password = process.env.PASSWORD;
const uri = `mongodb+srv://blurry29:${password}@cluster0.5txsxfb.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);
let db = null;

async function mongoConnect() {
  try {
    db = client.db("Challenge-p3");

    return db;
  } catch (error) {
    return error;
  }
}

function getDB() {
  return db;
}

module.exports = { mongoConnect, getDB };
