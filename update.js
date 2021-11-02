const DB_DOCUMENTS = "documents";
const COLLECTION_DOCUMENT = "document";

const Update = {
  updateMany: async function(client) {
    const db = client.db(DB_DOCUMENTS);
    const collection = db.collection(COLLECTION_DOCUMENT);
    const result = await collection.updateMany(
      { documentType: "perfios-salary-report" },
      { $set: { documentType: "perfios-salary-report_1" } }
    );
    console.log(JSON.stringify(result));
  },
  bulkUpdate: async function(client) {
    const db = client.db(DB_DOCUMENTS);
    const collection = db.collection(COLLECTION_DOCUMENT);
    const bulk = collection.initializeUnorderedBulkOp();
    bulk
      .find({ documentType: "perfios-salary-report_1" })
      .update({ $set: { documentType: "perfios-salary-report" } });
    const result = await bulk.execute();
    console.log(JSON.stringify(result));
  }
};

module.exports.Update = Update;
