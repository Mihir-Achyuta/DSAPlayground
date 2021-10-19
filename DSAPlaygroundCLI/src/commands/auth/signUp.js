const axios = require("axios");

const { errorHandler } = require("../../handlers/error/errorHandler");
const { signUpPrompt } = require("../../handlers/auth/authHandlers");

async function signUp() {
  try {
    const { data } = await axios.get(
      "https://shielded-fortress-73492.herokuapp.com/currentuser"
    );

    if (data["results"] === null) {
      const [email, password] = await signUpPrompt();
      const userData = await axios.default.post(
        "https://shielded-fortress-73492.herokuapp.com/signup",
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
