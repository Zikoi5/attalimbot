const MongoClient = require("mongoose");

const MONGODB_URL = process.env.MONGO_CONNECT_URL;

function getNumOfDocs(collectionName) {
  try {
    return new Promise((resolve) => {
      MongoClient.connect(MONGODB_URL, function (error, db) {
        if (error) throw error;

        return db.collection(collectionName).stats(function (error, stats) {
          if (error) throw error;

          // db.close();
          return resolve(stats.count);
        });
      });
    });
  } catch (err) {
    console.error("[getNumOfDocs] Error:", err);
  }
}

module.exports = getNumOfDocs;
