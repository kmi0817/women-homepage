"use strict";

const express = require("express");
const router = express.Router();

const facilityController = require("../../controllers/community/facility.controller");
const uploadErrHandle = require("../../config/upload");

router.get("/", facilityController.output.facility);

router.post("/", uploadErrHandle, facilityController.process.register);
router.patch("/", uploadErrHandle, facilityController.process.modify);
router.delete("/", facilityController.process.remove);

module.exports = router;