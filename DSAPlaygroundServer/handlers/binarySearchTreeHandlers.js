const { BinarySearchTree } = require("../models/binarySearchTree");
const { getUserData } = require("./userDataHandlers");

function displayBst(req, res) {}

function searchBst(req, res) {}

function createBst(req, res) {
  getUserData()
    .get()
    .then((doc) => {
      const { currentData } = doc.data();
      const isDuplicate = currentData["binary_search_tree"].find(
        (tree) => tree["name"] === req.params.name
      );

      if (isDuplicate) {
        res.json({
          message: `Binary Search Tree with name ${req.params.name} already exists`,
          error: false,
          code: 200,
          results: isDuplicate,
        });
      } else {
        currentData["binary_search_tree"].push({
          name: req.params.name,
          data: null,
        });
        getUserData().set({ currentData });
        res.json({
          message: `Binary Search Tree with name ${req.params.name} created`,
          error: false,
          code: 200,
          results: { name: req.params.name, data: [] },
        });
      }
    })
    .catch((error) => console.log(error));
}

function insertBst(req, res) {}

function deleteBst(req, res) {}

module.exports = { displayBst, deleteBst, createBst, insertBst, searchBst };
