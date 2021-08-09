const firebase = require("firebase");
const { MaxBinaryHeap } = require("../models/binaryHeap");

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

function deleteHeap(req, res) {
  getUserData()
    .get()
    .then((doc) => {
      const { currentData } = doc.data();
      const heapFound = currentData["binary_heap"].find(
        (heap) => heap["name"] === req.params.name
      );

      if (heapFound) {
        currentData["binary_heap"] = currentData["binary_heap"].filter(
          (heap) => heap["name"] !== req.params.name
        );
        getUserData().set({ currentData });

        res.json({
          message: `Deleted heap with name ${req.params.name}`,
          error: false,
          code: 200,
          results: heapFound,
        });
      } else {
        res.json({
          message: `Heap with name ${req.params.name} doesn't exist`,
          error: false,
          code: 200,
          results: heapFound,
        });
      }
    })
    .catch((error) => console.log(error));
}

function insertInHeap(req, res) {
  getUserData()
    .get()
    .then((doc) => {
      const { currentData } = doc.data();
      const heapFound = currentData["binary_heap"].find(
        (heap) => heap["name"] === req.params.name
      );

      if (heapFound) {
        const maxHeap = new MaxBinaryHeap(heapFound.data);

        heapFound["data"] = maxHeap.insert(parseInt(req.params.number));
        getUserData().set({ currentData });
        res.json({
          message: `Inserted ${req.params.number} into heap with name ${req.params.name}`,
          error: false,
          code: 200,
          results: heapFound,
        });
      } else {
        res.json({
          message: `Heap with name ${req.params.name} doesn't exist`,
          error: false,
          code: 200,
          results: heapFound,
        });
      }
    })
    .catch((error) => console.log(error));
}

function extractFromHeap(req, res) {
  getUserData()
    .get()
    .then((doc) => {
      const { currentData } = doc.data();
      const heapFound = currentData["binary_heap"].find(
        (heap) => heap["name"] === req.params.name
      );

      if (heapFound) {
        const maxHeap = new MaxBinaryHeap(heapFound.data);
        const number = maxHeap.extractMax();

        heapFound["data"] = maxHeap.values;
        getUserData().set({ currentData });
        res.json({
          message: `Extracted ${number} into heap with name ${req.params.name}`,
          error: false,
          code: 200,
          results: heapFound,
        });
      } else {
        res.json({
          message: `Heap with name ${req.params.name} doesn't exist`,
          error: false,
          code: 200,
          results: heapFound,
        });
      }
    })
    .catch((error) => console.log(error));
}

module.exports = {
  displayHeap,
  createHeap,
  deleteHeap,
  insertInHeap,
  extractFromHeap,
};
