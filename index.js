
const config =require('./config')
const mongoose = require("mongoose");
const connect = mongoose.connect(config.url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB : Succesfully Connected"))
  .catch((err) => console.log(err.message));


/*
const { MongoClient } = require("mongodb");
const config =require('./config')
const client = new MongoClient(config.url);
async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);
*/