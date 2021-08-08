const axios = require("axios");

const { errorHandler } = require("../../handlers/error/errorHandler");
const { signUpPrompt } = require("../../handlers/auth/authHandlers");

async function signUp() {
  try {
    const { data } = await axios.get("http://localhost:3001/currentuser");

    if (data["results"] === null) {
      const [email, password] = await signUpPrompt();
      const userData = await axios.default.post(
        "http://localhost:3001/signup",
        { email, password }
      );

      console.log(userData.data.message);
    } else {
      errorHandler(data["message"]);
    }
  } catch (error) {
    errorHandler(error);
  }
}

module.exports = { signUp };
