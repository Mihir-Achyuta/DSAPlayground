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
          results: { name: req.params.name, data: null },
        });
      }
    })
    .catch((error) => console.log(error));
}

function insertBst(req, res) {
  getUserData()
    .get()
    .then((doc) => {
      const { currentData } = doc.data();
      const treeFound = currentData["binary_search_tree"].find(
        (tree) => tree["name"] === req.params.name
      );

      if (treeFound) {
        const binarySearchTree = new BinarySearchTree(
          JSON.parse(treeFound.data)
        );
        const newTree = binarySearchTree.insert(parseInt(req.params.number));

        treeFound["data"] = JSON.stringify(newTree);
        getUserData().set({ currentData });
        res.json({
          message: `Inserted ${req.params.number} into binary search tree with name ${req.params.name}`,
          error: false,
          code: 200,
          results: treeFound,
        });
      } else {
        res.json({
          message: `Binary Search Tree with name ${req.params.name} doesn't exist`,
          error: false,
          code: 200,
          results: treeFound,
        });
      }
    })
    .catch((error) => console.log(error));
}

function deleteBst(req, res) {
  getUserData()
    .get()
    .then((doc) => {
      const { currentData } = doc.data();
      const treeFound = currentData["binary_search_tree"].find(
        (tree) => tree["name"] === req.params.name
      );

      if (treeFound) {
        currentData["binary_search_tree"] = currentData[
          "binary_search_tree"
        ].filter((tree) => tree["name"] !== req.params.name);
        getUserData().set({ currentData });

        res.json({
          message: `Deleted binary search tree with name ${req.params.name}`,
          error: false,
          code: 200,
          results: treeFound,
        });
      } else {
        res.json({
          message: `Binary Search Tree with name ${req.params.name} doesn't exist`,
          error: false,
          code: 200,
          results: treeFound,
        });
      }
    })
    .catch((error) => console.log(error));
}

module.exports = { displayBst, deleteBst, createBst, insertBst, searchBst };
