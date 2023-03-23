"use strict";

const express = require("express");
const router = express.Router();

const controller = require("../../controllers/main.controller");

router.get("/", controller.output.main);

module.exports = router;