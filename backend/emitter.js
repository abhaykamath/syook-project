const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const crypto = require("crypto");
const { getEncryptedString } = require("./utils/encryption");
const { randomMessage } = require("./utils/random");

const app = express();
const server = http.createServer(app);
const emitterIO = socketIo(server, { cors: { origin: "*" } });

function sendDataStream() {
  let number_of_messages = Math.floor(Math.random() * (499 - 49 + 1)) + 49;
  let stream = [];
  for (let i = 0; i < number_of_messages; i++) {
    let message = randomMessage();
    stream.push(message);
  }
  const encrypted_messages = getEncryptedString(stream);
  emitterIO.emit("data", encrypted_messages);
}

emitterIO.on("connection", () => {
  console.log("Emitter connected");
});

server.listen(5000, () => {
  console.log("Emitter running on port 5000...");
  setInterval(sendDataStream, 10000);
});
