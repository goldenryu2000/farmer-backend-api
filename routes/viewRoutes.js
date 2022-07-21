const express = require("express");
const router = express.Router();
const {
  dueNow,
  growingCrops,
  scheduleDue,
} = require("app/controllers/viewController");

router.get("/duenow", dueNow);
router.get("/growing", growingCrops);
// router.get("/:price/cost", addSchedule);
router.get("/:sid/scheduledue", scheduleDue);

module.exports = router;
