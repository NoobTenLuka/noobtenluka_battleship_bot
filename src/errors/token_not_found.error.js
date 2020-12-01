module.exports = class TokenNotFoundError extends Error {
  constructor() {
    super("The token for the discord bot could not be found. Make sure you provided a correct .env file");
  }
}