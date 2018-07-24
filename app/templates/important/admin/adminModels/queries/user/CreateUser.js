const User = require("../../user");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger").addError;
/**
 * Finds a single user in the User collection.
 * @param {object} userProps - Object containing <insert stuff here>
 * @return {promise} A promise that resolves with the user that was created
 */

/* might move hashing further up the chain */
module.exports = userProps => {
  const user = new User(userProps);
  return user.save();
};
