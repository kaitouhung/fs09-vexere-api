const express = require("express");
const stationController = require("./station.controller")
const { authenticate } = require("../../../../middlewares/auth");
const { authorize } = require("../../../../middlewares/auth");


const router = express.Router();

// /api +/stations => /api/stations

router.get("/stations", stationController.getStations);
router.get("/stations/:id", stationController.getStationById);
router.put("/stations/:id", authenticate, authorize(["admin"]), stationController.putStationById);
router.post(
    "/stations",
    authenticate,
    authorize(["admin"]),
    stationController.postStation);
router.patch("/stations/:id", authenticate, authorize(["admin"]), stationController.patchStationById);
router.delete("/stations/:id", authenticate, authorize(["admin"]), stationController.deleteStationById);

module.exports = router