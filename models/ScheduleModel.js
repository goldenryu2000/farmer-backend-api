const mongoose = require("mongoose");

const ScheduleData = new mongoose.Schema({
  farm: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Farm",
  },
  daysAfterSow: {
    type: Number,
    required: [true, "Please add Number of Days after Sowing"],
  },
  fertilizer: {
    type: {
      type: String,
      required: [true, "Please add a Fertilizer type"],
      max: 10,
    },
    quantity: {
      type: Number,
      required: [true, "Please add quantity of Fertilizer"],
    },
    quantityUnit: {
      type: String,
      required: [true, "Please specify quantity unit"],
      max: 5,
    },
  },
});

module.exports = mongoose.model("Schedule", ScheduleData);
