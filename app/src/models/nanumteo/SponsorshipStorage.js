"use strict";

const db = require("../../config/db");

class SponsorshipStorage {
    static async saveCMS(sInfo) {
        return new Promise((resolve, reject) => {
            // 17 Columns
            const query = `INSERT INTO sponsorship(
                id, name, job, email, addr1, addr2, addr3, tel, recommender, purpose, method,
                withdrawal_bank, account, depositor, withdrawal_date, amount, period
                ) 
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
            db.query(
                query,
                [
                    sInfo.id, sInfo.name, sInfo.job, sInfo.email, sInfo.addr1, sInfo.addr2, sInfo.addr3, sInfo.tel, sInfo.recommender, sInfo.purpose, sInfo.method,
                    sInfo.withdrawal_bank, sInfo.account, sInfo.depositor, sInfo.withdrawal_date, sInfo.amount, sInfo.period
                ],
                (err) => {
                    if (err) reject(`${err}`);
                    else resolve({ success: true });
                }
            );
        });
    }

    static async save(sInfo) {
        return new Promise((resolve, reject) => {
            // 11 Columns
            const query = `INSERT INTO sponsorship(
                id, name, job, email, addr1, addr2, addr3, tel, recommender, purpose, method
                ) 
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
            db.query(
                query,
                [
                    sInfo.id, sInfo.name, sInfo.job, sInfo.email, sInfo.addr1, sInfo.addr2, sInfo.addr3, sInfo.tel, sInfo.recommender, sInfo.purpose, sInfo.method
                ],
                (err) => {
                    if (err) reject(`${err}`);
                    else resolve({ success: true });
                }
            );
        });
    }
}

module.exports = SponsorshipStorage;