const mongoose = require("mongoose");

/**
 * @openapi
 * components:
 *   schemas:
 *     Farmer:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *         - language
 *         - country
 *       properties:
 *         name:
 *           type: string
 *           default: John Doe
 *         phone:
 *           type: number
 *           default: 123567890
 *         language:
 *           type: string
 *           default: Hindi
 *         country:
 *           type: string
 *           default: India
 *
 */
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
