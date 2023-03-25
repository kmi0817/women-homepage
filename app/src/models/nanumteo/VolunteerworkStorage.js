"use strict";

const db = require("../../config/db");

class VolunteerworkStorage {

    static async save(vInfo) {
        return new Promise((resolve, reject) => {
            // 12 Columns
            const query = `INSERT INTO volunteerwork(
                name, tel, hp, addr1, addr2, addr3, email, experience, description, begin_date, end_date, speak
                )
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
            db.query(
                query,
                [
                    vInfo.name, vInfo.tel, vInfo.hp, vInfo.addr1, vInfo.addr2, vInfo.addr3, vInfo.email, vInfo.experience, vInfo.description, vInfo.begin_date, vInfo.end_date, vInfo.speak
                ],
                (err) => {
                    if (err) reject(`${err}`);
                    else resolve({ success: true });
                }
            );
        });
    }

}

module.exports = VolunteerworkStorage;