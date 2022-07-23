const express = require("express");
const router = express.Router();
const {
  dueNow,
  growingCrops,
  scheduleDue,
  getCost,
} = require("../controllers/viewController");

router.get("/duenow", dueNow);
router.get("/growing", growingCrops);
router.get("/:id/cost", getCost);
router.get("/:sid/scheduledue", scheduleDue);

module.exports = router;
