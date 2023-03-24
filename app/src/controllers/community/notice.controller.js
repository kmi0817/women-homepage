"use strict";

const Notice = require("../../models/community/Notice");

const output = {
    notice: async (req, res) => {
        req.body["pageNo"] = Number(req.query.pageNo) || 1;
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
        const length = req.files.length;
        if (length) {
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
}

module.exports = {
    output,
    process
};