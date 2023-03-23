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
}

module.exports = History;