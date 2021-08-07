const prompts = require("prompts");

const { error } = require("../error/errorHandler");

async function signInPrompt() {
  try {
    const { email, password } = await prompts([
      {
        type: "text",
        name: "email",
        message: `Enter your email:`,
      },
      {
        type: "password",
        name: "password",
        message: "Enter your password:",
      },
    ]);

    return [email, password];
  } catch (error) {
    error(error);
  }
}

module.exports = { signInPrompt };
