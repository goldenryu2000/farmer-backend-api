const mongoose = require("mongoose");



const FarmerData = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a Name"],
    max: 50,
  },
  phone: {
    type: Number,
    required: [true, "Please add a Phone Number"],
    unique: true,
  },
  language: {
    type: String,
    required: [true, "Please Specify a language"],
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Country",
  },
});

module.exports = mongoose.model("Farmer", FarmerData);
