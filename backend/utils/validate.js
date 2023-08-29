const crypto = require("crypto");

function validateStream(decrypted_stream) {
  let valid_messages = [];

  for (const message of decrypted_stream) {
    const { name, origin, destination, secret_key } = message;
    if (
      secret_key ===
      crypto
        .createHash("sha256")
        .update(name + origin + destination)
        .digest("hex")
    ) {
      valid_messages.push(message);
    }
  }
  return valid_messages;
}

module.exports = {
  validateStream,
};
