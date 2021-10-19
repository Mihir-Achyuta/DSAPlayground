const axios = require("axios");
const { errorHandler } = require("../../handlers/error/errorHandler");

async function signOut() {
  try {
    const { data } = await axios.default.get(
      "https://shielded-fortress-73492.herokuapp.com/currentuser"
    );

    if (data["results"] !== null) {
      const userData = await axios.default.post(
        "https://shielded-fortress-73492.herokuapp.com/signout"
      );

      console.log(userData.data.message);
    } else {
      errorHandler(data["message"]);
    }
  } catch (error) {
    errorHandler(error);
  }

  return false;
}

module.exports = { signOut };
