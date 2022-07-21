const mongoose = require("mongoose");

/**
 * @openapi
 * components:
 *   schemas:
 *     Farm:
 *       type: object
 *       required:
 *         - area
 *         - village
 *         - sowingDate
 *       properties:
 *         area:
 *           type: number
 *           default: 0
 *         village:
 *           type: string
 *           default: VillageName
 *         sowingDate:
 *           type: date
 *           default: 12/12/12
 *
 */
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
