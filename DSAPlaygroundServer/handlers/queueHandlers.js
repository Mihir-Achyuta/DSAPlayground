const { Queue } = require("../models/queue");
const { getUserData } = require("./userDataHandlers");

function displayQueue(req, res) {
  getUserData()
    .get()
    .then((doc) => {
      const { currentData } = doc.data();
      const queueFound = currentData["queue"].find(
        (queue) => queue["name"] === req.params.name
      );

      if (queueFound) {
        res.json({
          message: `Here is the printed queue: [${queueFound.data}]`,
          error: false,
          code: 200,
          results: queueFound.data,
        });
      } else {
        res.json({
          message: `Queue with name ${req.params.name} doesn't exist`,
          error: false,
          code: 200,
          results: queueFound,
        });
      }
    });
}

function createQueue(req, res) {
  getUserData()
    .get()
    .then((doc) => {
      const { currentData } = doc.data();
      const isDuplicate = currentData["queue"].find(
        (queue) => queue["name"] === req.params.name
      );

      if (isDuplicate) {
        res.json({
          message: `Queue with name ${req.params.name} already exists`,
          error: false,
          code: 200,
          results: isDuplicate,
        });
      } else {
        currentData["queue"].push({ name: req.params.name, data: [] });
        getUserData().set({ currentData });
        res.json({
          message: `Queue with name ${req.params.name} created`,
          error: false,
          code: 200,
          results: { name: req.params.name, data: [] },
        });
      }
    })
    .catch((error) => console.log(error));
}

function enqueue(req, res) {}

function dequeue(req, res) {}

function deleteQueue(req, res) {
  getUserData()
    .get()
    .then((doc) => {
      const { currentData } = doc.data();
      const queueFound = currentData["queue"].find(
        (queue) => queue["name"] === req.params.name
      );

      if (queueFound) {
        currentData["queue"] = currentData["queue"].filter(
          (queue) => queue["name"] !== req.params.name
        );
        getUserData().set({ currentData });

        res.json({
          message: `Deleted queue with name ${req.params.name}`,
          error: false,
          code: 200,
          results: queueFound,
        });
      } else {
        res.json({
          message: `Queue with name ${req.params.name} doesn't exist`,
          error: false,
          code: 200,
          results: queueFound,
        });
      }
    })
    .catch((error) => console.log(error));
}

module.exports = { displayQueue, createQueue, enqueue, dequeue, deleteQueue };
