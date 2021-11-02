const { document } = require("./documentModel");
const DB_DOCUMENTS = "documents";
const COLLECTION_DOCUMENT = "document";

const Insert = {
  insertOne: async function(client) {
    const db = client.db(DB_DOCUMENTS);
    const collection = db.collection(COLLECTION_DOCUMENT);
    const record = {
      referenceIds: document.referenceIds,
      documentType: document.documentType,
      document: document.document,
      createdOn: document.createdOn,
      _class: document._class
    };
    await collection.insertOne(record);
    console.log(`Inserted One Record successfully -> ${record}`);
  },

  insertMany: async function(client, count) {
    const db = client.db(DB_DOCUMENTS);
    const collection = db.collection(COLLECTION_DOCUMENT);
    const records = addRecordsForInsertMany(count);
    await collection.insertMany(records, { ordered: false });
    console.log(`insertMany function inserted ${count} records successfully`);
  },

  bulkInsert: async function(client, count) {
    const db = client.db(DB_DOCUMENTS);
    const collection = db.collection(COLLECTION_DOCUMENT);
    const bulk = collection.initializeUnorderedBulkOp();
    addRecordsForBulkOp(count, bulk);
    await bulk.execute();
    console.log(`bulkInsert function inserted ${count} records successfully`);
  }
};

function addRecordsForInsertMany(count) {
  var records = [];
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
    records.push(record);
  }
  return records;
}

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

module.exports.Insert = Insert;
