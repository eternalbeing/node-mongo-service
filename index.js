const DB_DOCUMENTS = "documents";
const COLLECTION_DOCUMENT = "document";

const Index = {
  createIndex: async function(client) {
    const db = client.db(DB_DOCUMENTS);
    const collection = db.collection(COLLECTION_DOCUMENT);
    const result = await collection.createIndex(
      { documentType: 1 },
      { background: true, sparse: true }
    );
    console.log(JSON.stringify(result));
  },

  getIndexes: async function(client) {
    const db = client.db(DB_DOCUMENTS);
    const collection = db.collection(COLLECTION_DOCUMENT);
    const result = await collection.indexes();
    console.log(JSON.stringify(result));
  }
};

module.exports.Index = Index;
