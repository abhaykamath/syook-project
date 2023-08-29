const { names, cities } = require("../data.json");
const { getMessageWithSecretKey } = require("./hash");

function randomMessage() {
  let min = 0;
  let max = names.length - 1;
  let randomName = names[Math.floor(Math.random() * (max - min + 1)) + min];
  let citiesCopy = [...cities];
  max = citiesCopy.length - 1;
  let randomOriginIndex = Math.floor(Math.random() * (max - min + 1)) + min;
  let randomOrigin = citiesCopy[randomOriginIndex];
  citiesCopy.splice(randomOriginIndex, 1);
  max = citiesCopy.length - 1;
  let randomDestinationIndex =
    Math.floor(Math.random() * (max - min + 1)) + min;
  let randomDestination = citiesCopy[randomDestinationIndex];
  let message = getMessageWithSecretKey({
    name: randomName,
    origin: randomOrigin,
    destination: randomDestination,
  });
  return message;
}

module.exports = {
  randomMessage,
};
