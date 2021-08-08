const express = require("express");
const router = express.Router();

const firebase = require("firebase");
const { isAuthenticated } = require("../handlers/authHandlers");

router.get("/displayheap/:name", isAuthenticated);

router.post("/createheap/:name", isAuthenticated, function (req, res) {
  const userData = firebase.default
    .firestore()
    .collection("users")
    .doc(`${firebase.default.auth().currentUser.uid}`);

  userData
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
        userData.set({ currentData });
        res.json({
          message: `Heap with name ${req.params.name} created`,
          error: false,
          code: 200,
          results: { name: req.params.name, data: [] },
        });
      }
    })
    .catch((error) => console.log(error));
});
router.post("/insertheap/:name/:number", isAuthenticated);
router.post("/extractheap/:name", isAuthenticated);

module.exports = router;
