const Farmer = require("../models/FarmerModel");
const Country = require("../models/CountryModel");
const Farm = require("../models/FarmModel");
const Schedule = require("../models/ScheduleModel");
const asyncHandler = require("express-async-handler");
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
  if (!farmData || farmData.length == 0) {
    res.status(404);
    throw new Error("No Farm Data found");
  }

  // if farm has sowing date, then it gets pushed into the array
  let farmsGrowing = farmData.map((farm) => {
    if (farm.sowingDate !== "null" || farm.sowingDate !== "") {
      return farm;
    }
  });

  if (farmsGrowing.length == 0) {
    res.status(404);
    throw new Error("No farms are growing crops");
  }

  // get the farmIds as array
  let farmIds = farmsGrowing.map((farm) => farm._id);

  // find schedules for all the farm ids
  const schedules = await Schedule.find({ farm: { $in: farmIds } });

  if (!schedules || schedules.length == 0) {
    res.status(404);
    throw new Error("No schedules found for farms");
  }

  // then find the schedules due today/tomorrow
  let schedulesDue = [];
  schedules.forEach((schedule) => {
    farmsGrowing.forEach((farm) => {
      if (farm._id.toString() === schedule.farm.toString()) {
        const farmDate = new Date(farm.sowingDate).toLocaleDateString("en-US");
        let dayofharvest = new Date(farmDate);
        dayofharvest = dayofharvest.addDays(schedule.daysAfterSow);
        const today = new Date(Date.now());
        const due = dateDiffInDays(dayofharvest, today);
        if (due >= 0 && due <= 1) {
          schedule.farm = farm;
          schedulesDue.push(schedule);
        }
      }
    });
  });

  //send reponse
  if (schedulesDue.length > 0) {
    res.status(200).json(schedulesDue);
  } else {
    res.status(404);
    throw new Error("No Schedules Due for Today or Tomorrow");
  }
});

//@desc   Get farmers growing crops
//@route  GET /api/views/growing
//@access Public
const growingCrops = asyncHandler(async (req, res) => {
  // get all farm data
  const farmData = await Farm.find();
  if (!farmData || farmData.length == 0) {
    res.status(404);
    throw new Error("No Farm data found");
  }

  // let farmerId = new Set();
  let farmerId = new Set(
    farmData.map((farm) => {
      if (farm.sowingDate) {
        return farm.farmer;
      }
    })
  );

  if (farmerId.size == 0) {
    res.status(404);
    throw new Error("No Farmers found Growing Crops");
  }

  // convert to array
  farmerId = Array.from(farmerId);

  // find all the farmers growing crop
  const farmersGrowing = await Farmer.find({ _id: { $in: farmerId } });

  // send response
  if (farmersGrowing.length > 0) {
    res.status(200).json(farmersGrowing);
  } else {
    res.status(404);
    throw new Error("Cannot fetch Farmer Data");
  }
});

//@desc   GET cost of materials for single farmer
//@route  GET /api/views/:id/cost?solid=0&liquid=0
//@access Public
const getCost = asyncHandler(async (req, res) => {
  let { solid, liquid } = req.query;
  if (!solid && !liquid) {
    res.status(400);
    throw new Error("Please Provide prices for fertilizers");
  }

  if (!(solid || solid > 0)) {
    // if solid price is not in body or is smaller than zero
    solid = 0;
  }
  if (!(liquid || liquid > 0)) {
    // if liquid price is not in body or smaller than zero
    liquid = 0;
  }

  const farmer = await Farmer.findById(req.params.id);
  if (!farmer) {
    res.status(404);
    throw new Error("Farmer does not exist");
  }

  const farms = await Farm.find({ farmer: farmer.id });
  if (!farms || farms.length == 0) {
    res.status(404);
    throw new Error("No farms for this Farmer");
  }

  //get all farmIDs in an array
  let farmIds = farms.map((farm) => farm.id);
  // query all schedules for the farmsIds
  const schedules = await Schedule.find({ farm: { $in: farmIds } });
  if (!schedules || schedules.length == 0) {
    res.status(404);
    throw new Error("No Schedules for the farms exist");
  }
  console.log(solid);
  console.log(liquid);
  console.log(schedules.length);
  let prices = {
    liquidCost: 0,
    solidCost: 0,
    totalCost: 0,
  };
  schedules.forEach((schedule) => {
    let qty = 0;
    if (schedule.fertilizer.type === "liquid") {
      if (schedule.fertilizer.quantityUnit === "ml") {
        qty = schedule.fertilizer.quantity / 1000;
      } else {
        qty = schedule.fertilizer.quantity;
      }
      prices.liquidCost += qty * liquid;
    } else if (schedule.fertilizer.type === "solid") {
      if (schedule.fertilizer.quantityUnit === "ton") {
        qty = schedule.fertilizer.quantity * 1000;
      } else if (schedule.fertilizer.quantityUnit === "g") {
        qty = schedule.fertilizer.quantity / 1000;
      } else {
        qty = schedule.fertilizer.quantity;
      }
      prices.solidCost += qty * solid;
    }
  });

  prices.totalCost = prices.liquidCost + prices.solidCost;
  // send response
  if (prices) {
    res.status(200).json(prices);
  } else {
    res.status(404);
    throw new Error("cannot fetch prices");
  }
});

//@desc   Get Schedule due date
//@route  GET /api/views/:sid/scheduledue
//@access Public
const scheduleDue = asyncHandler(async (req, res) => {
  const schedule = await Schedule.findById(req.params.sid);

  // if scheduleis not found
  if (!schedule) {
    res.status(404);
    throw new Error("Schedule Not Found");
  }

  // fetch farm data for the schedule
  const farm = await Farm.findById(schedule.farm);

  if (!farm) {
    res.status(404);
    throw new Error("Farm Not found for the Given Schedule");
  }

  // get due date for schedule
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
    throw new Error("Cannot Find Due date");
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
  getCost,
};
