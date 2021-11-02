const DB_DOCUMENTS = "documents";
const COLLECTION_DOCUMENT = "document";

const Fetch = {
  findOne: async function(client) {
    const db = client.db(DB_DOCUMENTS);
    const collection = db.collection(COLLECTION_DOCUMENT);
    const result = await collection.findOne();
    console.log(JSON.stringify(result));
  },

  findByCriteria: async function(client, criteria) {
    const db = client.db(DB_DOCUMENTS);
    const collection = db.collection(COLLECTION_DOCUMENT);
    const result = await collection.find(criteria).toArray();
    if (result) console.log(JSON.stringify(result));
  }
};

module.exports.Fetch = Fetch;
