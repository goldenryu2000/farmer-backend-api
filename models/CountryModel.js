const mongoose = require("mongoose");

const CountryData = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Specify country Name"],
  },
});

module.exports = mongoose.model("Country", CountryData);
