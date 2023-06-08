"use strict";

const express = require("express");
const router = express.Router();

const nanumteoController = require("../../controllers/nanumteo.controller");
const uploadErrHandle = require("../../config/upload");

router.get("/donation", nanumteoController.output.donationMain);
router.get("/donation/apply", nanumteoController.output.donationApply);
router.get("/volunteer", nanumteoController.output.volunteerMain);
router.get("/volunteer/apply", nanumteoController.output.volunteerApply);
router.get("/counsel", nanumteoController.output.counselMain);
router.get("/counsel/:id", nanumteoController.output.counselId);

router.post("/donation/apply", nanumteoController.process.donationApply);
router.post("/volunteer/apply", nanumteoController.process.volunteerApply);
router.post("/counsel", uploadErrHandle, nanumteoController.process.counselRegister);
router.post("/counsel/comment", nanumteoController.process.commentRegister);

module.exports = router;