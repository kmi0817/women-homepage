"use strict";

const FacilityStorage = require("./FacilityStorage");

class Facility {
    constructor(body) {
        this.body = body;
    }

    async register() {
        const facility = this.body;
        try {
            const response = await FacilityStorage.save(facility);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async show() {
        const facility = this.body;
        try {
            const response = await FacilityStorage.getFacilities(facility);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async modify() {
        const facility = this.body;
        try {
            const response = await FacilityStorage.update(facility);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async remove() {
        const facility = this.body;
        try {
            const response = await FacilityStorage.delete(facility);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }
}

module.exports = Facility;