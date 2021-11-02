const { MongoClient } = require("mongodb");
const { document } = require("./documentModel");

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
    // await insertOne(client);
    // await bulkInsert(client, 100000);
    // await insertMany(client, 300000);
    // await updateMany(client);
    // await bulkUpdate(client);
    // await createIndex(client);
    let t2 = Date.now();
    console.log(
      `Time taken to execute the command - ` + (t2 - t1) + " milliseconds"
    );
  } finally {
    await client.close();
  }
};

const insertOne = async client => {
  const db = client.db(DB_DOCUMENTS);
  const collection = db.collection(COLLECTION_DOCUMENT);
  const record = {
    referenceIds: document.referenceIds,
    documentType: document.documentType,
    document: document.document,
    createdOn: document.createdOn,
    _class: document._class
  };
  return await collection.insertOne(record);
};

const insertMany = async (client, count) => {
  const db = client.db(DB_DOCUMENTS);
  const collection = db.collection(COLLECTION_DOCUMENT);
  const records = addRecordsForInsertMany(count);
  await collection.insertMany(records, { ordered: false });
};

function addRecordsForInsertMany(count) {
  var records = [];
  for (var i = 100001; i <= count; i++) {
    let documentType =
      document.documentType[
        Math.floor(Math.random() * document.documentType.length)
      ];
    let referenceIds = { applicationId: `MLP00${i}`, customerId: `${i}` };

    const record = {
      referenceIds: referenceIds,
      documentType: documentType,
      document: document.document,
      createdOn: document.createdOn,
      _class: document._class
    };
    records.push(record);
  }
  return records;
}

const bulkInsert = async (client, count) => {
  const db = client.db(DB_DOCUMENTS);
  const collection = db.collection(COLLECTION_DOCUMENT);
  const bulk = collection.initializeUnorderedBulkOp();
  addRecordsForBulkOp(count, bulk);
  await bulk.execute();
};

function addRecordsForBulkOp(count, bulk) {
  for (var i = 1; i <= count; i++) {
    let documentType =
      document.documentType[
        Math.floor(Math.random() * document.documentType.length)
      ];
    let referenceIds = { applicationId: `MLP00${i}`, customerId: `${i}` };

    const record = {
      referenceIds: referenceIds,
      documentType: documentType,
      document: document.document,
      createdOn: document.createdOn,
      _class: document._class
    };
    bulk.insert(record);
  }
}

const updateMany = async client => {
  const db = client.db(DB_DOCUMENTS);
  const collection = db.collection(COLLECTION_DOCUMENT);
  await collection.updateMany(
    { documentType: "perfios-salary-report" },
    { $set: { documentType: "perfios-salary-report_1" } }
  );
};

const bulkUpdate = async client => {
  const db = client.db(DB_DOCUMENTS);
  const collection = db.collection(COLLECTION_DOCUMENT);
  const bulk = collection.initializeUnorderedBulkOp();
  bulk
    .find({ documentType: "perfios-salary-report_1" })
    .update({ $set: { documentType: "perfios-salary-report_1" } });
  await bulk.execute();
};

const createIndex = async client => {
  const db = client.db(DB_DOCUMENTS);
  const collection = db.collection(COLLECTION_DOCUMENT);
  await collection.createIndex(
    { documentType: 1 },
    { background: true, sparse: true }
  );
};

main().catch(console.error);
