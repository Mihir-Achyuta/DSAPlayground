const firebase = require("firebase");

function getUserData() {
  return firebase.default
    .firestore()
    .collection("users")
    .doc(`${firebase.default.auth().currentUser.uid}`);
}

function displayHeap(req, res) {
  getUserData()
    .get()
    .then((doc) => {
      const { currentData } = doc.data();
      const heapFound = currentData["binary_heap"].find(
        (heap) => heap["name"] === req.params.name
      );

      if (heapFound) {
        res.json({
          message: `Here is the printed heap: [${heapFound.data}]`,
          error: false,
          code: 200,
          results: heapFound.data,
        });
      } else {
        res.json({
          message: `Heap with name ${req.params.name} doesn't exist`,
          error: false,
          code: 200,
          results: heapFound,
        });
      }
    });
}

function createHeap(req, res) {
  getUserData()
    .get()
    .then((doc) => {
      const { currentData } = doc.data();
      const isDuplicate = currentData["binary_heap"].find(
        (heap) => heap["name"] === req.params.name
      );

      if (isDuplicate) {
        res.json({
          message: `Heap with name ${req.params.name} already exists`,
          error: false,
          code: 200,
          results: isDuplicate,
        });
      } else {
        currentData["binary_heap"].push({ name: req.params.name, data: [] });
        getUserData().set({ currentData });
        res.json({
          message: `Heap with name ${req.params.name} created`,
          error: false,
          code: 200,
          results: { name: req.params.name, data: [] },
        });
      }
    })
    .catch((error) => console.log(error));
}

function insertInHeap(req, res) {}

function extractFromHeap(params) {}

module.exports = { displayHeap, createHeap, insertInHeap, extractFromHeap };
