"use strict";

const SponsorshipStorage = require("./SponsorshipStorage");

class Sponsorship {
    constructor(body) {
        this.body = body;
    }

    async apply() {
        const sponsorship = this.body;
        try {
            if (sponsorship.method === "CMS 자동이체") {
                const response = await SponsorshipStorage.saveCMS(sponsorship);
                return response;
            } else {
                const response = await SponsorshipStorage.save(sponsorship);
                return response;
            }
        } catch (err) {
            return { success: false, err };
        }
    }
}

module.exports = Sponsorship;