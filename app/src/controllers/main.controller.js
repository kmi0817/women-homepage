"use strict";

const sanitizeHtml = require("sanitize-html");

const History = require("../models/History");

const output = {
    main: async (req, res) => {
        const history = new History(req.body);
        const response = await history.show();
        
        return res.json(response);
    },
}

const post = {
    history: async (req, res) => {
        const history = new History(req.body);
        const response = await history.register();

        return res.json(response);
    },
}

const patch = {
    history: async (req, res) => {
        const history = new History(req.body);
        const response = await history.modify();

        return res.json(response);
    },
}

const del = {
    history: async(req, res) => {
        const history = new History(req.body);
        const response = history.drop();

        return res.json(response);
    },
}

module.exports = {
    output,
    post,
    patch,
    del,
};