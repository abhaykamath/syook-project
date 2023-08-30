const mongoose = require("mongoose");

const timeSeriesSchema = new mongoose.Schema({
  timestampMinute: Date,
  data: [
    {
      name: String,
      origin: String,
      destination: String,
      timestamp: Date,
    },
  ],
});

timeSeriesSchema.index({ timestampMinute: 1 });

const TimeSeriesModel = mongoose.model("TimeSeriesData", timeSeriesSchema);

module.exports = TimeSeriesModel;
