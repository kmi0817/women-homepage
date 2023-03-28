"use strict";

const VolunteerStorage = require("./VolunteerStorage");

class Volunteer {
    constructor(body) {
        this.body = body;
    }

    async apply() {
        const volunteer = this.body;
        try {
            const response = await VolunteerStorage.save(volunteer);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }
}

module.exports = Volunteer;