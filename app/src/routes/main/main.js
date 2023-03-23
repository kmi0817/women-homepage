"use strict";

const express = require("express");
const router = express.Router();

const mainController = require("../../controllers/main.controller");

router.get("/", mainController.output.main);

router.post("/history", mainController.post.history);

module.exports = router;