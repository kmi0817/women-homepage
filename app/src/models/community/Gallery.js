"use strict";

const GalleryStorage = require("./GalleryStorage");

class Gallery {
    constructor(body) {
        this.body = body;
    }

    async register() {
        const gallery = this.body;
        try {
            const response = await GalleryStorage.save(gallery);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async show() {
        const gallery = this.body;
        try {
            if (gallery.hasOwnProperty("category")) {
                if (gallery.category === "title") { // Search by title
                    const data = await GalleryStorage.getGalleriesByTitle(gallery);
                    return { success: true, data: data };
                } else if (gallery.category === "writer") {// Search by writer
                    const data = await GalleryStorage.getGalleriesByWriter(gallery);
                    return { success: true, data: data };
                } else if (gallery.category === "description") { // Search by description
                    const data = await GalleryStorage.getGalleriesByDesc(gallery);
                    return { success: true, data: data };
                }
            }
            
            // No search filter
            const data = await GalleryStorage.getGalleries(gallery.startNo);
            return { success: true, data: data };
        } catch (err) {
            return { success: false, err };
        }
    }

    async showOne() {
        const gallery = this.body;
        try {
            const data = await GalleryStorage.getGallery(gallery.id);
            if (!data.id) // check if posting for this id exist
                return { success: false, msg: `Posting for this id doesn't exist` };
            return { success: true, data: data}
        } catch (err) {
            return { success: false, err };
        }
    }

    async modify() {
        const gallery = this.body;
        try {
            const { id } = await GalleryStorage.getGallery(gallery.id); // get id
            if (!id) // check if postig for this id exist
                return { success: false, msg: "Posting for this id doesn't exist"}
            const response = await GalleryStorage.update(gallery);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async remove() {
        const gallery = this.body;
        try {
            const { id } = await GalleryStorage.getGallery(gallery.id); // get id
            if (!id) // check if postig for this id exist
                return { success: false, msg: "Posting for this id doesn't exist"}
            const response = await GalleryStorage.delete(gallery.id);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }
}

module.exports = Gallery;