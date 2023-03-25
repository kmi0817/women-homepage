"use strict";

const { v4: uuid4 } = require("uuid");
const bcrypt = require("bcrypt");
const Sponsorship = require("../models/nanumteo/Sponsorship");
const Volunteerwork = require("../models/nanumteo/Volunteerwork.js");
const Counsel = require("../models/nanumteo/Counsel");

const output = {
    sMain: (req, res) => {
        res.json({ success: true });
    },
    sApply: (req, res) => {
        res.json({ success: true });
    },
    vMain: (req, res) => {
        res.json({ success: true });
    },
    vApply: (req, res) => {
        res.json({ success: true });
    },
    cMain: async (req, res) => {
        const pageNo = Number(req.query.pageNo) || 1; // set page number
        const startNo = (pageNo - 1) * 10; // set start number on that page
        req.body.startNo = startNo;

        const counsel = new Counsel(req.body);
        const response = await counsel.show();
        res.json(response);
    },
    cId: async (req, res) => {
        req.body.id = req.params.id;
        const counsel = new Counsel(req.body);
        const response = await counsel.showOne();
        res.json(response);
    }
}

const process = {
    sApply: async (req, res) => {
        const sponsorship = new Sponsorship(req.body);
        const response = await sponsorship.apply();
        return res.json(response);
    },
    vApply: async (req, res) => {
        const volunteerwork = new Volunteerwork(req.body);
        const response = await volunteerwork.apply();
        return res.json(response);
    },
    cRegister: async (req, res) => {
        req.body["id"] = uuid4(); // add id
        
        // password encryption
        const salt = await bcrypt.genSalt(10); // generate a random 10 char string (length: 29)
        const password = await bcrypt.hash(req.body["password"], salt); // length: 60
        req.body["password"] = password; // change plain password to hashed password

        // file attachment
        const length = req.files.length;
        if (!length) {
            req.body["originalname"] = null;
            req.body["filename"] = null;
        } else {
            let originalnames = [],
                filenames = [];
            for (let f of req.files) {
                originalnames.push(f.originalname);
                filenames.push(f.filename);
            }
            req.body["originalname"] = `${originalnames}`;
            req.body["filename"] = `${filenames}`;
        }

        const counsel = new Counsel(req.body);
        const response = await counsel.register();
        return res.json(response);
    }
}

module.exports = {
    output,
    process,
};