const { MongoClient } = require("mongodb");
const { document } = require("./documentModel");
const { Insert } = require("./insert");
const { Update } = require("./update");
const { Index } = require("./index");

const mongoDbUri = "mongodb://localhost/";
const DB_DOCUMENTS = "documents";
const COLLECTION_DOCUMENT = "document";

const main = async () => {
  let client;
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
    client = await MongoClient.connect(mongoDbUri, options);

    let t1 = Date.now();
    // await Insert.insertOne(client);
    // await Insert.bulkInsert(client, 100);
    // await Insert.insertMany(client, 300);
    // await Update.updateMany(client);
    // await Update.bulkUpdate(client);
    // await Index.getIndexes(client);
    // await Index.createIndex(client);
    let t2 = Date.now();
    console.log(
      `Time taken to execute the command - ` + (t2 - t1) + " milliseconds"
    );
  } finally {
    await client.close();
  }
};

main().catch(console.error);
