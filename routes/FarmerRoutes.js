const express = require("express");
const router = express.Router();
const {
  newFarmer,
  addFarm,
  addSchedule,
} = require("app/controllers/farmerController");

router.post("/newfarmer", newFarmer);

router.post("/:id/newfarm", addFarm);

router.post("/:fid/newschedule", addSchedule);

module.exports = router;
