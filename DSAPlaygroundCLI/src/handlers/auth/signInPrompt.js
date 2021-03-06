const prompts = require("prompts");

const { errorHandler } = require("../error/errorHandler");

async function signInPrompt() {
  try {
    const { email, password } = await prompts([
      {
        type: "text",
        name: "email",
        message: `Enter your email to sign in:`,
      },
      {
        type: "password",
        name: "password",
        message: "Enter your password to sign in:",
      },
    ]);

    return [email, password];
  } catch (error) {
    errorHandler(error);
  }
}

module.exports = { signInPrompt };
