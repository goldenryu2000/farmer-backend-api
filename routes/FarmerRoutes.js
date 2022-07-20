const express = require("express");
const router = express.Router();
const {
  newFarmer,
  addFarm,
  addSchedule,
} = require("../controllers/farmerController");

/**
 * @openapi
 * /api/newfarmer:
 *   post:
 *     tags:
 *       - Add a new Farmer
 *     description: Add a new farmer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Farmer'
 *     responses:
 *       201:
 *         description: New Farmer added.
 *       400:
 *         description: Farmer Already Exists
 */
router.post("/newfarmer", newFarmer);
/**
 * @openapi
 * /api/{id}/newfarm:
 *   post:
 *     tags:
 *       - Add a new Farmer
 *     description: Add a new farmer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Farmer'
 *     responses:
 *       201:
 *         description: New Farmer added.
 *       400:
 *         description: Farmer Already Exists
 */
router.post("/:id/newfarm", addFarm);
router.post("/:fid/newschedule", addSchedule);

module.exports = router;
