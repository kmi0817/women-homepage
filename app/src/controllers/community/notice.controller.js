"use strict";

const Notice = require("../../models/community/Notice");

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
    process,
};