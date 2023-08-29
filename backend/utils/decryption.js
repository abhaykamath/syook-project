const crypto = require("crypto");

const passphrase = "syook";

function getDecryptedString(encrypted_string) {
  const key = crypto.createHash("sha256").update(passphrase).digest();
  const encrypted_messages = encrypted_string.split("|");
  const decrypted_messages = [];

  for (const encrypted_message of encrypted_messages) {
    const decipher = crypto.createDecipher("aes-256-cbc", key);
    let decrypted_message = decipher.update(encrypted_message, "hex", "utf-8");
    decrypted_message += decipher.final("utf-8");
    decrypted_messages.push(JSON.parse(decrypted_message));
  }

  return decrypted_messages;
}

module.exports = {
  getDecryptedString,
};
