"use strict";

const db = require("../../config/db");

class DonationStorage {
    static async saveCMS(dInfo) {
        return new Promise((resolve, reject) => {
            // 17 Columns
            const query = `INSERT INTO donation(
                id, name, job, email, addr1, addr2, addr3, tel, recommender, purpose, method,
                withdrawal_bank, account, depositor, withdrawal_date, amount, period
                ) 
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
            db.query(
                query,
                [
                    dInfo.id, dInfo.name, dInfo.job, dInfo.email, dInfo.addr1, dInfo.addr2, dInfo.addr3, dInfo.tel, dInfo.recommender, dInfo.purpose, dInfo.method,
                    dInfo.withdrawal_bank, dInfo.account, dInfo.depositor, dInfo.withdrawal_date, dInfo.amount, dInfo.period
                ],
                (err) => {
                    if (err) reject(`${err}`);
                    else resolve({ success: true });
                }
            );
        });
    }

    static async save(dInfo) {
        return new Promise((resolve, reject) => {
            // 11 Columns
            const query = `INSERT INTO donation(
                id, name, job, email, addr1, addr2, addr3, tel, recommender, purpose, method
                ) 
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
            db.query(
                query,
                [
                    dInfo.id, dInfo.name, dInfo.job, dInfo.email, dInfo.addr1, dInfo.addr2, dInfo.addr3, dInfo.tel, dInfo.recommender, dInfo.purpose, dInfo.method
                ],
                (err) => {
                    if (err) reject(`${err}`);
                    else resolve({ success: true });
                }
            );
        });
    }
}

module.exports = DonationStorage;