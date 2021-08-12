const axios = require("axios");

const { errorHandler } = require("../../handlers/error/errorHandler");
const { signInPrompt } = require("../../handlers/auth/authHandlers");

async function signIn() {
  try {
    const { data } = await axios.default.get(
      "https://z575cc22e-za2982c25-gtw.qovery.io/currentuser"
    );

    if (data["results"] === null) {
      const [email, password] = await signInPrompt();
      const userData = await axios.default.post(
        "https://z575cc22e-za2982c25-gtw.qovery.io/signin",
        { email, password }
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

module.exports = { signIn };
