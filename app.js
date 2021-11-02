const { MongoClient } = require("mongodb");
const { document } = require("./documentModel");
const { Insert } = require("./insert");
const { Update } = require("./update");
const { Index } = require("./mongo-index");
const { Fetch } = require("./fetch");

const mongoDbUri = "mongodb://localhost/";

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
    // await Fetch.findOne(client);
    // await Fetch.findByCriteria(client, {
    //   createdOn: new Date("2021-11-01T10:32:37.193Z")
    // });
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
