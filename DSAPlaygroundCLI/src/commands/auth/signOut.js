const axios = require("axios");
const { errorHandler } = require("../../handlers/error/errorHandler");

async function signOut() {
  try {
    const { data } = await axios.default.get(
      "http://localhost:3001/currentuser"
    );

    if (data["results"] !== null) {
      const userData = await axios.default.post(
        "http://localhost:3001/signout"
      );

      console.log(userData.data.message);
    } else {
      errorHandler(data["message"]);
    }
  } catch (error) {
    errorHandler(error);
  }
}

module.exports = { signOut };
