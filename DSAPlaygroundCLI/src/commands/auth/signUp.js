const axios = require("axios");

const { errorHandler } = require("../../handlers/error/errorHandler");
const { signUpPrompt } = require("../../handlers/auth/authHandlers");

async function signUp() {
  try {
    const { data } = await axios.get(
      "https://z575cc22e-za2982c25-gtw.qovery.io/currentuser"
    );

    if (data["results"] === null) {
      const [email, password] = await signUpPrompt();
      const userData = await axios.default.post(
        "https://z575cc22e-za2982c25-gtw.qovery.io/signup",
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

module.exports = { signUp };
