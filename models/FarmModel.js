const mongoose = require("mongoose");

const FarmData = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Farmer",
  },
  area: {
    type: Number,
    required: [true, "Please add an Area"],
  },
  village: {
    type: String,
    required: [true, "Please add Village"],
    min: 5,
  },
  sowingDate: {
    type: Date,
    default: "",
  },
});

module.exports = mongoose.model("Farm", FarmData);
