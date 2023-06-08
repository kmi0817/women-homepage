"use strict";

const express = require("express");
const router = express.Router();

const galleryController = require("../../controllers/community/gallery.controller");
const uploadErrHandle = require("../../config/upload");

router.get("/", galleryController.output.gallery);
router.get("/:id", galleryController.output.galleryId);

router.post("/", uploadErrHandle, galleryController.process.register);
router.patch("/", uploadErrHandle, galleryController.process.modify);
router.delete("/", galleryController.process.remove);

module.exports = router;