const crypto = require("crypto");

function getMessageWithSecretKey(message) {
  const { name, origin, destination } = message;
  const hash = crypto
    .createHash("sha256")
    .update(name + origin + destination)
    .digest("hex");
  return { name, origin, destination, secret_key: hash };
}

module.exports = {
  getMessageWithSecretKey,
};
