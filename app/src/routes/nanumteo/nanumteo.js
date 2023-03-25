"use strict";

const express = require("express");
const router = express.Router();

const nanumteoController = require("../../controllers/nanumteo.controller");
const uploadErrHandle = require("../../config/upload");

router.get("/sponsorship", nanumteoController.output.sMain);
router.get("/sponsorship/apply", nanumteoController.output.sApply);
router.get("/volunteerwork", nanumteoController.output.vMain);
router.get("/volunteerwork/apply", nanumteoController.output.vApply);
router.get("/counsel", nanumteoController.output.cMain);
router.get("/counsel/:id", nanumteoController.output.cId);

router.post("/sponsorship/apply", nanumteoController.process.sApply);
router.post("/volunteerwork/apply", nanumteoController.process.vApply);
router.post("/counsel", uploadErrHandle, nanumteoController.process.cRegister);

module.exports = router;