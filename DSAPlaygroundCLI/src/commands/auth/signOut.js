const axios = require("axios");
const { errorHandler } = require("../../handlers/error/errorHandler");

async function signOut() {
  try {
    const { data } = await axios.get("http://localhost:3001/currentuser");

    if (data["results"] !== null) {
      //make user sign up
    } else {
      errorHandler(data["message"]);
    }
  } catch (error) {
    errorHandler(error);
  }
}

module.exports = { signOut };
