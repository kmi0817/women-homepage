"use strict";

const Facility = require("../../models/community/Facility");

const output = {
    facility: async (req, res) => {
        req.body["pageNo"] = Number(req.query.pageNo) || 1;
        const facility = new Facility(req.body);
        const response = await facility.show();
        return res.json(response);
    },
}

const process = {
    register: async (req, res) => {
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