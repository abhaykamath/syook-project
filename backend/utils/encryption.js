const crypto = require("crypto");

const passphrase = "syook";

function getEncryptedString(messages) {
  const key = crypto.createHash("sha256").update(passphrase).digest();
  const encrypted_messages = [];

  for (const message of messages) {
    const message_string = JSON.stringify(message);
    const cipher = crypto.createCipher("aes-256-cbc", key);
    let encrypted_message = cipher.update(message_string, "utf-8", "hex");
    encrypted_message += cipher.final("hex");
    encrypted_messages.push(encrypted_message);
  }

  const combined_encrypted_messages = encrypted_messages.join("|");

  return combined_encrypted_messages;
}

module.exports = {
  getEncryptedString,
};
