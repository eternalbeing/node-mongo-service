const {MongoClient} = require('mongodb');
var Grid = require('gridfs-stream');

async function main(){
    const uri = "mongodb://localhost/";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
 
    try {
        await client.connect();
        await uploadFile(client);
        // await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
};

async function uploadFile(client) {
    const db = client.db("test");
    var gfs = Grid(db, MongoClient);

    var writestream = gfs.createWriteStream({
        filename: 'my_file.txt'
    });
    fs.createReadStream('/Users/178064/Documents/MyDocuments/learning/node-mongo-service/my_file.txt').pipe(writestream);

    writestream.on('close', function (file) {
        // do something with `file`
        console.log(file.filename);
      });

};

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

main().catch(console.error);