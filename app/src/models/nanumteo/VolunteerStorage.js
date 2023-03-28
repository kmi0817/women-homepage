"use strict";

const db = require("../../config/db");

class VolunteerStorage {

    static async save(vInfo) {
        return new Promise((resolve, reject) => {
            // 13 Columns
            const query = `INSERT INTO volunteer(
                id, name, tel, hp, addr1, addr2, addr3, email, experience, description, begin_date, end_date, speak
                )
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
            db.query(
                query,
                [
                    vInfo.id, vInfo.name, vInfo.tel, vInfo.hp, vInfo.addr1, vInfo.addr2, vInfo.addr3, vInfo.email, vInfo.experience, vInfo.description, vInfo.begin_date, vInfo.end_date, vInfo.speak
                ],
                (err) => {
                    if (err) reject(`${err}`);
                    else resolve({ success: true });
                }
            );
        });
    }

}

module.exports = VolunteerStorage;