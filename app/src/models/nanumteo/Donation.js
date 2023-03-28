"use strict";

const DonationStorage = require("./DonationStorage");

class Donation {
    constructor(body) {
        this.body = body;
    }

    async apply() {
        const donation = this.body;
        try {
            if (donation.method === "CMS 자동이체") {
                const response = await DonationStorage.saveCMS(donation);
                return response;
            } else {
                const response = await DonationStorage.save(donation);
                return response;
            }
        } catch (err) {
            return { success: false, err };
        }
    }
}

module.exports = Donation;