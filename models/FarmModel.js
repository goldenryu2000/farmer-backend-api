const mongoose = require("mongoose");

const FarmData = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Farmer",
  },
  Area: {
    type: String,
    required: [true, "Please add an Area"],
    min: 5,
  },
  Village: {
    type: String,
    required: [true, "Please add Village"],
    min: 5,
  },
  SowingDate: {
    type: Date,
    required: [true, "Please Add a date"],
  },
});

module.exports = mongoose.model("Farm", FarmData);
