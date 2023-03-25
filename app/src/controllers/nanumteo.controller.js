"use strict";

const Sponsorship = require("../models/nanumteo/Sponsorship");
const Volunteerwork = require("../models/nanumteo/Volunteerwork.js");

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
    }
}

module.exports = {
    output,
    process,
};