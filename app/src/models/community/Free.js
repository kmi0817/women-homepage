"use strict";

const FreeStorage = require("./FreeStorage");

class Free {
    constructor(body) {
        this.body = body;
    }

    async register() {
        const free = this.body;
        try {
            const response = await FreeStorage.save(free);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async show() {
        const free = this.body;
        try {
            if (free.hasOwnProperty("category")) {
                if (free.category === "title") { // Search by title
                    const response = await FreeStorage.getFreesByTitle(free);
                    return response;
                } else if (free.category === "writer") {// Search by writer
                    const response = await FreeStorage.getFreesByWriter(free);
                    return response;
                } else if (free.category === "description") { // Search by description
                    const response = await FreeStorage.getFreesByDesc(free);
                    return response;
                }
            }
            
            // No search filter
            const response = await FreeStorage.getFrees(free.startNo);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async showOne() {
        const free = this.body;
        try {
            const response = await FreeStorage.getFree(free.id);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async modify() {
        const free = this.body;
        try {
            const response = await FreeStorage.update(free);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async remove() {
        const free = this.body;
        try {
            const response = await FreeStorage.delete(free.id);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }
}

module.exports = Free;