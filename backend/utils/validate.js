const crypto = require("crypto");
const TimeSeriesModel = require("../models/timeSeries");

async function validateStream(decrypted_stream) {
  return new Promise(async (resolve, reject) => {
    try {
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
          message.timestamp = new Date();
          valid_messages.push(message);
          const minuteStart = new Date(message.timestamp);
          minuteStart.setSeconds(0, 0);

          await TimeSeriesModel.findOneAndUpdate(
            { timestampMinute: minuteStart },
            {
              $push: {
                data: message,
              },
            },
            { upsert: true }
          );
        }
      }
      console.log("Pushed to DB first");
      resolve(valid_messages);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  validateStream,
};
