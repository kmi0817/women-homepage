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

    async modify(uuid) {
        const history = this.body;

        try {
            const response = await HistoryStorage.update(uuid, history);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async drop() {
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