const axios = require("axios");
const { errorHandler } = require("../../handlers/error/errorHandler");

async function signOut() {
  try {
    const { data } = await axios.default.get(
      "https://z575cc22e-za2982c25-gtw.qovery.io/currentuser"
    );

    if (data["results"] !== null) {
      const userData = await axios.default.post(
        "https://z575cc22e-za2982c25-gtw.qovery.io/signout"
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
