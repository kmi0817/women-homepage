"use strict";

const CounselStorage = require("./CounselStorage");

class Counsel {
    constructor(body) {
        this.body = body
    }

    async register() {
        const counsel = this.body;
        try {
            const response = await CounselStorage.save(counsel);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }
}

module.exports = Counsel;