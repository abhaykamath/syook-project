const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { io } = require("socket.io-client");
const { getDecryptedString } = require("./utils/decryption");
const { validateStream } = require("./utils/validate");

const emitterSocket = io.connect("http://localhost:5000");

const app = express();
const server = http.createServer(app);
const listenerIO = socketIo(server, { cors: { origin: "*" } });

emitterSocket.on("data", (stream) => {
  let total, valid;
  const decrypted_stream = getDecryptedString(stream);
  total = decrypted_stream.length;
  const valid_stream = validateStream(decrypted_stream);
  valid = valid_stream.length;
  console.log(
    `In this stream Total Messages : ${total} and Valid Messages : ${valid}`
  );
  listenerIO.emit("dataStream", valid_stream);
});

server.listen(5001, () => {
  console.log("Listener running on port 5001...");
});
