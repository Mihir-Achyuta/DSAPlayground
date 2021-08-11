const firebase = require("firebase");

function getUserData() {
  return firebase.default
    .firestore()
    .collection("users")
    .doc(`${firebase.default.auth().currentUser.uid}`);
}

function getDsaNames(req, res) {
  getUserData()
    .get()
    .then((doc) => {
      const { currentData } = doc.data();
      const nameArray =
        currentData[`${req.params.category}`] &&
        currentData[`${req.params.category}`].map(
          (category) => category["name"]
        );

      res.json({
        error: false,
        code: 200,
        results: nameArray || null,
      });
    })
    .catch((error) => console.log(error));
}

module.exports = { getUserData, getDsaNames };
