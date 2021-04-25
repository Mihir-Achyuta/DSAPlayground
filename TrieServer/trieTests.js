//these tests will incorporate all 5 methods(add, delete, search, autocomplete, display) but gradually incorporate each one per test
//these tests will be global and test the global state as preferred in the requirements
const axios = require("axios");

//should expect 5 words to be added in the trie
//if a request succeeds then the word will be added
async function addFiveAndGetFive() {
  let wordArray = ["This", "is", "one", "nice", "test"];
  let requestsSuceeded = true;

  await resetTrie();
  console.log("Test 1 Started");
  for (let i of wordArray) {
    try {
      let results = await axios.post(
        `https://triechallenge.herokuapp.com/add`,
        {
          specifiedWord: i,
        }
      );
      console.log(results["data"]["message"]);
    } catch (error) {
      requestsSuceeded = false;
    }
  }

  console.log(`All 5 Requests Succeeded? ${requestsSuceeded}`);
  console.log("Test 1 Ended");
  console.log("");
}

//should expect 4 words to be added in the trie
function addFiveAndDeleteOne() {}

//should expect 3 words to be added in the trie and the last added word to be found
function addFiveAndDeleteTwoAndSearchTrue() {}

function addFiveAndDeleteTwoAndSearchFalse() {}

function addFiveAndDeleteTwoAndAuto() {}

function addFiveAndDeleteTwoAndDisplay() {}

//resets trie as needed
async function resetTrie() {
  try {
    let results = await axios.get(`https://triechallenge.herokuapp.com/reset`);
    console.log(results["data"]["message"]);
  } catch (error) {
    console.log("Trie not reset");
  }
}

//uncomment each test as needed
// addFiveAndGetFive();
// addFiveAndDeleteOne();
// addFiveAndDeleteTwoAndSearchTrue();
// addFiveAndDeleteTwoAndSearchFalse();
// addFiveAndDeleteTwoAndAuto();
// addFiveAndDeleteTwoAndDisplay();
