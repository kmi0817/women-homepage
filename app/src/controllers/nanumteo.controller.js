"use strict";

const { v4: uuid4 } = require("uuid");
const bcrypt = require("bcrypt");
const Donation = require("../models/nanumteo/Donation");
const Volunteer = require("../models/nanumteo/Volunteer.js");
const Counsel = require("../models/nanumteo/Counsel");
const CounselComment = require("../models/nanumteo/CounselComment");

const output = {
    donationMain: (req, res) => {
        res.json({ success: true });
    },
    donationApply: (req, res) => {
        res.json({ success: true });
    },
    volunteerMain: (req, res) => {
        res.json({ success: true });
    },
    volunteerApply: (req, res) => {
        res.json({ success: true });
    },
    counselMain: async (req, res) => {
        const pageNo = Number(req.query.pageNo) || 1; // set page number
        const startNo = (pageNo - 1) * 10; // set start number on that page
        req.body.startNo = startNo; // add startNo in req.body

        // Search
        if (req.query.category !== undefined && req.query.keyword !== undefined) {
            if (req.query.category !== "title" && req.query.category !== "writer") // Filter category's value
                return res.json({ success: false, err: "category should be 'title' or 'writer'" });
            req.body.category = req.query.category; // add category in req.body
            req.body.keyword = req.query.keyword // add search keywrod in req.body
        }

        const counsel = new Counsel(req.body);
        const response = await counsel.show();
        return res.json(response);
    },
    counselId: async (req, res) => {
        req.body.id = req.params.id; // add id in req.body
        const counsel = new Counsel(req.body);
        const response1 = await counsel.showOne();

        if (!response1.success) // if an error occurs in counsel
            return res.json(response1); // then just return (don't try to read comments)

        const cmnt = new CounselComment(req.body);
        const response2 = await cmnt.show();
        const response = {
            counsel: response1,
            comment: response2
        }
        return res.json(response);
    }
}

const process = {
    donationApply: async (req, res) => {
        req.body.id = uuid4(); // add id
        const donation = new Donation(req.body);
        const response = await donation.apply();
        return res.json(response);
    },
    volunteerApply: async (req, res) => {
        req.body.id = uuid4(); // add id
        const volunteer = new Volunteer(req.body);
        const response = await volunteer.apply();
        return res.json(response);
    },
    counselRegister: async (req, res) => {
        req.body.id = uuid4(); // add id
        
        // password encryption
        const salt = await bcrypt.genSalt(10); // generate a random 10 char string (length: 29)
        const password = await bcrypt.hash(req.body.password, salt); // length: 60
        req.body.password = password; // change plain password to hashed password

        // file attachment
        const length = req.files.length;
        if (!length) { // no attachment
            req.body.originalname = null;
            req.body.filename = null;
        } else { // attachment
            let originalnames = [], filenames = [];
            for (let f of req.files) {
                originalnames.push(f.originalname);
                filenames.push(f.filename);
            }
            req.body.originalname = `${originalnames}`;
            req.body.filename = `${filenames}`;
        }

        const counsel = new Counsel(req.body);
        const response = await counsel.register();
        return res.json(response);
    },
    commentRegister: async (req, res) => {
        req.body.id = uuid4(); // add id
        const comment = new CounselComment(req.body);
        const response = await comment.register();
        return res.json(response);
    },
}

module.exports = {
    output,
    process,
};