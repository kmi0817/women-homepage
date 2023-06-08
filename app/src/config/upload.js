"use strict";

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "./src/uploads");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        return cb(null, `${path.basename(file.originalname, ext)}_${Date.now()}${ext}`);
    }
});

// extension filter
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/gif" ||
        file.mimetype === "application/x-hwp, application/haansofthwp, application/vnd.hancom.hwp" ||
        file.mimetype === "application/pdf" ||
        file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            return cb(null, true);
        } else {
            req.fileValidationError = "Only png, jpg/jpeg, gig, hwp, pdf, xlxs, docx available";
            return cb(null, false, new Error("INVALID_EXTENSION"));
        }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 30 * 1024 * 1024 },
}).array("attachedFiles", 5); // maxCount 5

const uploadErrHandle = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.json({ success: false, err });
        } else if(req.fileValidationError) { // Invalid file type
            return res.json({ success: false, err: { "name": "MulterError", "message": "INVALID_EXTENSION", "code": req.fileValidationError } });
        } else {
            return next();
        }
    });
};

module.exports = uploadErrHandle;