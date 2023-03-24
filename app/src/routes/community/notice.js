"use strict";

const express = require("express");
const router = express.Router();

const noticeController = require("../../controllers/community/notice.controller");
const uploadErrHandle = require("../../config/upload");

router.get("/", noticeController.output.notice);
router.get("/:id", noticeController.output.noticeId);

router.post(
    "/",
    uploadErrHandle,
    noticeController.process.register
);
router.patch(
    "/",
    uploadErrHandle,
    noticeController.process.modify
);
router.delete("/", noticeController.process.remove);

module.exports = router;