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