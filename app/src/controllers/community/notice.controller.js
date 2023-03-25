"use strict";

const { v4: uuid4 } = require("uuid");
const Notice = require("../../models/community/Notice");

const output = {
    notice: async (req, res) => {
        const pageNo = Number(req.query.pageNo) || 1; // set page number
        const startNo = (pageNo - 1) * 10; // set start number on that page
        req.body.startNo = startNo; // add startNo in req.body
        
        // Search
        if (req.query.category !== undefined && req.query.keyword !== undefined) {
            const category = req.query.category;
            const keyword = req.query.keyword;
            if (category !== "title" && category !== "writer" && category !== "description") // Filter category's value
                return res.json({ success: false, err: "category should be 'title', 'writer' or 'description'" });
            req.body.category = category; // add category in req.body
            req.body.keyword = keyword // add search keywrod in req.body
        }

        const notice = new Notice(req.body);
        const response = await notice.show();
        return res.json(response);
    },
    noticeId: async (req, res) => {
        req.body.id = req.params.id; // add id in req.body
        const notice = new Notice(req.body);
        const response = await notice.showOne();
        return res.json(response);
    },
}

const process = {
    register: async (req, res) => {
        req.body.id = uuid4(); // add id

        // process file
        const length = req.files.length;
        if (!length) { // no attachment
            req.body.originalname = null;
            req.body.filename = null;
        } else { // attachement
            let originalnames = [], filenames = [];
            for (let f of req.files) {
                originalnames.push(f.originalname);
                filenames.push(f.filename);
            }
            req.body.originalname = `${originalnames}`;
            req.body.filename = `${filenames}`;
        }

        const notice = new Notice(req.body);
        const response = await notice.register();
        return res.json(response);
    },
    modify: async (req, res) => {
        // process file
        const length = req.files.length;
        if (!length) { // no attachment
            req.body.originalname = null;
            req.body.filename = null;
        } else { // attachement
            let originalnames = [], filenames = [];
            for (let f of req.files) {
                originalnames.push(f.originalname);
                filenames.push(f.filename);
            }
            req.body.originalname = `${originalnames}`;
            req.body.filename = `${filenames}`;
        }

        const notice = new Notice(req.body);
        const response = await notice.modify();
        return res.json(response);
    },
    remove: async (req, res) => {
        const notice = new Notice(req.body);
        const response = await notice.remove();
        return res.json(response);
    },
}

module.exports = {
    output,
    process
};