"use strict";

const express = require("express");
const router = express.Router();

const freeController = require("../../controllers/community/free.controller");
const uploadErrHandle = require("../../config/upload");

router.get("/", freeController.output.free);
router.get("/:id", freeController.output.freeId);

router.post("/", uploadErrHandle, freeController.process.register);
router.patch("/", uploadErrHandle, freeController.process.modify);
router.delete("/", freeController.process.remove);

module.exports = router;