"use strict";

const History = require("../models/History");

const output = {
    main: async (req, res) => {
        const history = new History(req.body);
        const response = await history.show();
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