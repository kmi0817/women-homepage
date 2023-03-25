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
            if (facility.hasOwnProperty("category")) {
                if (facility.category === "title") { // Search by title
                    const response = await FacilityStorage.getFacilitiesByTitle(facility);
                    return response;
                } else if (facility.category === "writer") {// Search by writer
                    const response = await FacilityStorage.getFacilitiesByWriter(facility);
                    return response;
                }
            }
            
            // No search filter
            const response = await FacilityStorage.getFacilities(facility.startNo);
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
            const response = await FacilityStorage.delete(facility.id);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }
}

module.exports = Facility;