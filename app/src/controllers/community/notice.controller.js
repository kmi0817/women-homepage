"use strict";

const { v4: uuid4 } = require("uuid");
const Notice = require("../../models/community/Notice");

const output = {
    notice: async (req, res) => {
        const pageNo = Number(req.query.pageNo) || 1; // set page number
        const startNo = (pageNo - 1) * 10; // set start number on that page
        req.body.startNo = startNo;
        
        const notice = new Notice(req.body);
        const response = await notice.show();
        return res.json(response);
    },
    noticeId: async (req, res) => {
        req.body["id"] = req.params.id;
        const notice = new Notice(req.body);
        const response = await notice.showOne();
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

        const notice = new Notice(req.body);
        const response = await notice.register();
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

        const notice = new Notice(req.body);
        const response = notice.modify();
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