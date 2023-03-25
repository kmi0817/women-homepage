"use strict";

const galleryStorage = require("./galleryStorage");

class Gallery {
    constructor(body) {
        this.body = body;
    }

    async register() {
        const gallery = this.body;
        try {
            const response = await galleryStorage.save(gallery);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async show() {
        const gallery = this.body;
        try {
            const response = await galleryStorage.getGalleries(gallery.startNo);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async showOne() {
        const gallery = this.body;
        try {
            const response = await galleryStorage.getGallery(gallery.id);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async modify() {
        const gallery = this.body;
        try {
            const response = await galleryStorage.update(gallery);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async remove() {
        const gallery = this.body;
        try {
            const response = await galleryStorage.delete(gallery.id);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }
}

module.exports = Gallery;