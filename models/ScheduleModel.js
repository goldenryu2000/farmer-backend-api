const mongoose = require("mongoose");

const ScheduleData = new mongoose.Schema({
  farm: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Farm",
  },
  daysAfterSow: {
    type: Number,
    required: [true, "Please add a Date after Sowing"],
  },
  fertilizer: {
    type: {
      type: String,
      required: [true, "Please add a Fertilizer type"],
      max: 7,
    },
    quantity: {
      type: Number,
      required: [true, "Please add quantity of Fertilizer"],
    },
    quantityUnit: {
      type: String,
      required: [true, "Please specify quantity unit"],
      max: 3,
    },
  },
});

module.exports = mongoose.model("Schedule", ScheduleData);
