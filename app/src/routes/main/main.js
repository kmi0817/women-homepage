"use strict";

const express = require("express");
const router = express.Router();

const mainController = require("../../controllers/main.controller");

router.get("/", mainController.output.main);

router.post("/history", mainController.post.history);
router.patch("/history", mainController.patch.history);
router.delete("/history", mainController.del.history);

module.exports = router;