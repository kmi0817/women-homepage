"use strict";

const { v4: uuid4 } = require("uuid");
const Gallery = require("../../models/community/Gallery");

const output = {
    gallery: async (req, res) => {
        const pageNo = Number(req.query.pageNo) || 1; // set page number
        const startNo = (pageNo - 1) * 10; // set start number on that page
        req.body.startNo = startNo;
        
        const gallery = new Gallery(req.body);
        const response = await gallery.show();
        return res.json(response);
    },
    galleryId: async (req, res) => {
        req.body["id"] = req.params.id;
        const gallery = new Gallery(req.body);
        const response = await gallery.showOne();
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

        const gallery = new Gallery(req.body);
        const response = await gallery.register();
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

        const gallery = new Gallery(req.body);
        const response = gallery.modify();
        return res.json(response);
    },
    remove: async (req, res) => {
        const gallery = new Gallery(req.body);
        const response = await gallery.remove();
        return res.json(response);
    },
}

module.exports = {
    output,
    process
};