"use strict";

const HistoryStorage = require("./HistoryStorage");

class History {
    constructor(body) {
        this.body = body;
    }

    async register() {
        const history = this.body;
        try {
            const response = await HistoryStorage.save(history);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async show() {
        try {
            const data = await HistoryStorage.getHistories();
            return { success: true, data: data };
        } catch (err) {
            return { success: false, err };
        }
    }

    async modify() {
        const history = this.body;
        try {
            const response = await HistoryStorage.update(history);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async remove() {
        const history = this.body;
        try {
            const response = await HistoryStorage.delete(history);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }
}

module.exports = History;