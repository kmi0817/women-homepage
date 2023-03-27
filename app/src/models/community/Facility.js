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
                    const data = await FacilityStorage.getFacilitiesByTitle(facility);
                    return { success: true, data: data };
                } else if (facility.category === "writer") {// Search by writer
                    const data = await FacilityStorage.getFacilitiesByWriter(facility);
                    return { success: true, data: data };
                }
            }
            
            // No search filter
            const data = await FacilityStorage.getFacilities(facility.startNo);
            return { success: true, data: data };
        } catch (err) {
            return { success: false, err };
        }
    }

    async modify() {
        const facility = this.body;
        try {
            const { id } = await FacilityStorage.getFacility(facility.id); // get id
            if (!id) // check if postig for this id exist
                return { success: false, msg: "Posting for this id doesn't exist"}
            const response = await FacilityStorage.update(facility);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }

    async remove() {
        const facility = this.body;
        try {
            const { id } = await FacilityStorage.getFacility(facility.id); // get id
            if (!id) // check if postig for this id exist
                return { success: false, msg: "Posting for this id doesn't exist"}
            const response = await FacilityStorage.delete(facility.id);
            return response;
        } catch (err) {
            return { success: false, err };
        }
    }
}

module.exports = Facility;