"use strict";

const History = require("../models/History");
const Notice = require("../models/community/Notice");
const Free = require("../models/community/Free");

const output = {
    main: async (req, res) => {
        req.body.pageNo = Number(req.query.pageNo) || 1;

        const history = new History(req.body);
        const response1 = await history.show();
        const notice = new Notice(req.body);
        const response2 = await notice.show();
        const free = new Free(req.body);
        const response3 = await free.show();

        // Combine data
        const response = {
            history: response1,
            notice: response2,
            free: response3
        }

        return res.json(response);
    },
    sostt: async (req, res) => {
        const history = new History(req.body);
        const response = await history.show();
        return res.json(response);
    },
}

const process = {
    register: async (req, res) => {
        const history = new History(req.body);
        const response = await history.register();

        return res.json(response);
    },
    modify: async (req, res) => {
        const history = new History(req.body);
        const response = await history.modify();

        return res.json(response);
    },
    remove: async(req, res) => {
        const history = new History(req.body);
        const response = history.remove();

        return res.json(response);
    },
};

module.exports = {
    output,
    process
};