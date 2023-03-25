"use strict";

const VolunteerworkStorage = require("./VolunteerworkStorage");

class Volunteerwork {
    constructor(body) {
        this.body = body;
    }

    async apply() {
        const volunteerwork = this.body;
        try {
            const response = await VolunteerworkStorage.save(volunteerwork);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }
}

module.exports = Volunteerwork;