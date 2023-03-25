"use strict";

const { v4: uuid4 } = require("uuid");
const Facility = require("../../models/community/Facility");

const output = {
    facility: async (req, res) => {
        const pageNo = Number(req.query.pageNo) || 1; // set page number
        const startNo = (pageNo - 1) * 10; // set start number on that page
        req.body.startNo = startNo;
        
        const facility = new Facility(req.body);
        const response = await facility.show();
        return res.json(response);
    },
}

const process = {
    register: async (req, res) => {
        req.body["id"] = uuid4(); // add id
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

        const facility = new Facility(req.body);
        const response = await facility.register();
        return res.json(response);
    },
    modify: async (req, res) => {
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

        const facility = new Facility(req.body);
        const response = facility.modify();
        return res.json(response);
    },
    remove: async (req, res) => {
        const facility = new Facility(req.body);
        const response = await facility.remove();
        return res.json(response);
    },
}

module.exports = {
    output,
    process
};