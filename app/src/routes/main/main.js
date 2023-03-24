"use strict";

const express = require("express");
const router = express.Router();

const mainController = require("../../controllers/main.controller");

router.get("/", mainController.output.main);

router.post("/history", mainController.process.register);
router.patch("/history", mainController.process.modify);
router.delete("/history", mainController.process.remove);

module.exports = router;