var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fikani-default-rtdb.firebaseio.com",
  storageBucket: "gs://fikani.appspot.com",
});

const mediaStorage = admin.storage().bucket();

module.exports = {
  mediaStorage,
};
