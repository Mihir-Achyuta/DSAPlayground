const { Stack } = require("../models/stack");
const { getUserData } = require("./userDataHandlers");

function displayStack(req, res) {
  getUserData()
    .get()
    .then((doc) => {
      const { currentData } = doc.data();
      const stackFound = currentData["stack"].find(
        (stack) => stack["name"] === req.params.name
      );

      if (stackFound) {
        res.json({
          message: `Here is the printed stack: [${stackFound.data}]`,
          error: false,
          code: 200,
          results: stackFound.data,
        });
      } else {
        res.json({
          message: `Stack with name ${req.params.name} doesn't exist`,
          error: false,
          code: 200,
          results: stackFound,
        });
      }
    });
}

function createStack(req, res) {
  getUserData()
    .get()
    .then((doc) => {
      const { currentData } = doc.data();
      const isDuplicate = currentData["stack"].find(
        (stack) => stack["name"] === req.params.name
      );

      if (isDuplicate) {
        res.json({
          message: `Stack with name ${req.params.name} already exists`,
          error: false,
          code: 200,
          results: isDuplicate,
        });
      } else {
        currentData["stack"].push({
          name: req.params.name,
          data: [],
        });
        getUserData().set({ currentData });
        res.json({
          message: `Stack with name ${req.params.name} created`,
          error: false,
          code: 200,
          results: {
            name: req.params.name,
            data: [],
          },
        });
      }
    })
    .catch((error) => console.log(error));
}

function pushStack(req, res) {}

function popStack(req, res) {}

function deleteStack(req, res) {}

module.exports = {
  displayStack,
  createStack,
  pushStack,
  popStack,
  deleteStack,
};
