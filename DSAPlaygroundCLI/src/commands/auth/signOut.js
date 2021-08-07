const axios = require("axios");
const { error } = require("../../handlers/error/errorHandler");

async function signOut() {
  try {
    const { data } = await axios.get("http://localhost:3001/currentuser");

    if (data["results"] !== null) {
      //make user sign up
    } else {
      error(data["message"]);
    }
  } catch (error) {
    error(error);
  }
}

module.exports = { signOut };
