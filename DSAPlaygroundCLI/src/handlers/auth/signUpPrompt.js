const prompts = require("prompts");

const { errorHandler } = require("../error/errorHandler");

async function signUpPrompt() {
  try {
    const { email, password } = await prompts([
      {
        type: "text",
        name: "email",
        message: `Enter an email to sign up:`,
      },
      {
        type: "password",
        name: "password",
        message: "Enter a password to sign up:",
      },
    ]);

    return [email, password];
  } catch (error) {
    errorHandler(error);
  }
}

module.exports = { signUpPrompt };
