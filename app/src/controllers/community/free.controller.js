"use strict";

const Free = require("../../models/community/Free");

const output = {
    free: async (req, res) => {
        req.body["pageNo"] = Number(req.query.pageNo) || 1;
        const free = new Free(req.body);
        const response = await free.show();
        return res.json(response);
    },
    freeId: async (req, res) => {
        req.body["id"] = req.params.id;
        const free = new Free(req.body);
        const response = await free.showOne();
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

        const free = new Free(req.body);
        const response = await free.register();
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

        const free = new Free(req.body);
        const response = free.modify();
        return res.json(response);
    },
    remove: async (req, res) => {
        const free = new Free(req.body);
        const response = await free.remove();
        return res.json(response);
    },
}

module.exports = {
    output,
    process
};