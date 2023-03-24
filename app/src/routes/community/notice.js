"use strict";

const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const noticeController = require("../../controllers/community/notice.controller");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "./src/public/uploads/");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        return cb(null, `${file.fieldname}_${Date.now()}${ext}`);
    }
});

const upload = multer({
    storage: storage
}).array("attachedFiles", 5); // maxCount 5

router.get("/", noticeController.output.notice);
router.get("/:id", noticeController.output.noticeId);

router.post(
    "/register",
    (req, res, next) => {
        upload(req, res, (err) => {
            return err ? res.json({ success: false, err }) : next();
        });
    },
    noticeController.process.register
);
router.patch(
    "/modify",
    (req, res, next) => {
        upload(req, res, (err) => {
            return err ? res.json({ success: false, err }) : next();
        });
    },
    noticeController.process.modify
);
router.delete("/remove", noticeController.process.remove);

module.exports = router;