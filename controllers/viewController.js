const Farmer = require("../models/FarmerModel");
const Country = require("../models/CountryModel");
const Farm = require("../models/FarmModel");
const Schedule = require("../models/ScheduleModel");
const asyncHandler = require("express-async-handler");
const { set, default: mongoose } = require("mongoose");
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

//@desc   Get schedules due today/tomorrow
//@route  GET /api/views/duenow
//@access Public
const dueNow = asyncHandler(async (req, res) => {
  let Schedules = [];
  const farmData = await Farm.find(); // get all farm data
  for await (const farm of farmData) {
    const schedule = await Schedule.find({ farm: farm.id }); // get schedules for each farm
    schedule.forEach((s) => {
      const farmDate = new Date(farm.sowingDate).toLocaleDateString("en-US");
      let dayofharvest = new Date(farmDate);
      dayofharvest = dayofharvest.addDays(s.daysAfterSow);
      const today = new Date(Date.now());
      const due = dateDiffInDays(dayofharvest, today);
      if (due >= 0 && due <= 1) {
        s.farm = farm;
        Schedules.push(s);
      }
    });
  }
  if (Schedules.length > 0) {
    res.status(200).json(Schedules);
  } else {
    res.status(404);
    throw new Error("No Due Schedules for Today or Tomorrow");
  }
});
//@desc   Get farmers growing crops
//@route  GET /api/views/growing
//@access Public
const growingCrops = asyncHandler(async (req, res) => {
  const farmData = await Farm.find(); // get all farm data
  let farmerId = new Set();
  let farmersGrowing = [];
  farmData.forEach((farm) => {
    if (farm.sowingDate) {
      farmerId.add(farm.farmer.toString());
    }
  });

  farmerId = Array.from(farmerId);
  for await (const id of farmerId) {
    const farmer = await Farmer.findById(mongoose.Types.ObjectId(id));
    if (farmer) {
      farmersGrowing.push(farmer);
    }
  }

  // send response
  if (farmersGrowing.length > 0) {
    res.status(200).json(farmersGrowing);
  } else {
    res.status(404);
    throw new Error("No Farmers Growing crops currently");
  }
});
//@desc   Get Schedule due date
//@route  GET /api/views/:sid/scheduledue
//@access Public
const scheduleDue = asyncHandler(async (req, res) => {
  const schedule = await Schedule.findById(req.params.sid);
  if (!schedule) {
    res.status(404);
    throw new Error("Schedule Not Found");
  }

  const farm = await Farm.findById(mongoose.Types.ObjectId(schedule.farm));

  if (!farm) {
    res.status(404);
    throw new Error("Farm Not found for the Given Schedule");
  }

  const farmDate = new Date(farm.sowingDate).toLocaleDateString("en-US");
  let dayofharvest = new Date(farmDate);
  dayofharvest = dayofharvest.addDays(schedule.daysAfterSow);
  const today = new Date(Date.now());
  const due = dateDiffInDays(dayofharvest, today);
  let dueDate = new Date();
  dueDate = dueDate.addDays(due);
  // send response
  if (dueDate) {
    res.status(200).json({
      daysFromToday: due - 1,
      dueDate,
    });
  } else {
    res.status(404);
    throw new Error("No Farmers Growing crops currently");
  }
});

// to get difference in dates
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc1 - utc2) / (1000 * 60 * 60 * 24));
}

module.exports = {
  dueNow,
  growingCrops,
  scheduleDue,
};
