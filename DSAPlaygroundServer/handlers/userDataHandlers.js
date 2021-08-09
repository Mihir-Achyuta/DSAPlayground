const firebase = require("firebase");

function getUserData() {
  return firebase.default
    .firestore()
    .collection("users")
    .doc(`${firebase.default.auth().currentUser.uid}`);
}

module.exports = { getUserData };
