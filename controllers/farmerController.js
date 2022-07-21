const Farmer = require("../models/FarmerModel");
const Country = require("../models/CountryModel");
const Farm = require("../models/FarmModel");
const Schedule = require("../models/ScheduleModel");
const asyncHandler = require("express-async-Handler");

//@desc Create a new Farmer
//@route  POST /api/newfarmer
//@access Public
const newFarmer = asyncHandler(async (req, res) => {
  const { name, phone, language } = req.body;
  let { country } = req.body;

  if (!name || !phone || !language || !country) {
    res.status(400);
    throw new Error("Please add all the required fields");
  }

  const checkFarmer = await Farmer.findOne({ phone });
  if (checkFarmer) {
    res.status(400);
    throw new Error("Farmer already exists");
  }

  // check if country exists
  country = country.toLowerCase();
  let countryData = await Country.findOne({ name: country });
  //if it doesn't exist
  if (!countryData) {
    //Create a new Country
    countryData = await newCountry(country);
  }

  // create a new farmer
  const newFarmer = await Farmer.create({
    name,
    phone,
    language,
    country: countryData,
  });

  if (newFarmer) {
    res.status(201).json({
      id: newFarmer.id,
      name: newFarmer.name,
      phone: newFarmer.phone,
      language: newFarmer.language,
      country: newFarmer.country,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

//@desc Add a new Farm
//@route  POST /api/:id/addfarm
//@access Public**
const addFarm = asyncHandler(async (req, res) => {
  const farmerId = req.params.id;
  const { area, village } = req.body;
  let { sowingDate } = req.body;

  if (!area || !village) {
    res.status(400);
    throw new Error("Please add all the required fields");
  }
  const farmerExists = await Farmer.findById(farmerId);
  if (!farmerExists) {
    res.status(400);
    throw new Error("Farmer does not exist");
  }

  // create a new farm
  if (sowingDate) {
    sowingDate = new Date(sowingDate);
  } else {
    sowingDate = "";
  }

  const newFarm = await Farm.create({
    farmer: farmerId,
    area,
    village,
    sowingDate,
  });

  if (newFarm) {
    res.status(201).json({
      id: newFarm.id,
      village: newFarm.village,
      area: newFarm.area,
      sowingDate: newFarm.sowingDate,
      farmer: newFarm.farmer,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Farm Data");
  }
});

//@desc Add a new Schedule
//@route  POST /api/:fid/addschedule
//@access Public**

const addSchedule = asyncHandler(async (req, res) => {
  const farmId = req.params.fid;
  let { daysAfterSow, fertilizer } = req.body;

  if (!daysAfterSow || !fertilizer) {
    res.status(400);
    throw new Error("Please add all the required fields");
  }
  let { type, quantity, quantityUnit } = fertilizer;

  if (!type || !quantity || !quantityUnit) {
    res.status(400);
    throw new Error("Please add all the fertilizer details");
  }

  const farmExists = await Farm.findById(farmId);
  if (!farmExists) {
    res.status(400);
    throw new Error("Farm does not exist");
  }

  // create a new Schedule
  quantityUnit = quantityUnit.toLowerCase();
  daysAfterSow = new Date(daysAfterSow);
  const newSchedule = await Schedule.create({
    farm: farmId,
    daysAfterSow,
    fertilizer: {
      type,
      quantity,
      quantityUnit,
    },
  });

  if (newSchedule) {
    res.status(201).json({
      farm: newSchedule.farm,
      id: newSchedule.id,
      daysAfterSow: newSchedule.daysAfterSow,
      fertilizer: newSchedule.fertilizer,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Schedule Data");
  }
});

//Create a new Country
const newCountry = asyncHandler(async (country) => {
  const newCnt = await Country.create({
    name: country,
  });

  if (newCnt) {
    return newCnt;
  }
});

module.exports = {
  newFarmer,
  addFarm,
  addSchedule,
};
