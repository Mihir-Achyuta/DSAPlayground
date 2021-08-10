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

function createStack(req, res) {}

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
