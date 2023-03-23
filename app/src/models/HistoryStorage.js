"use strict";

const { v1 } = require("uuid");

const db = require("../config/db");

class HistoryStorage {

    static async save(historyInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO history2(uuid, year, month, description) VALUES(?, ?, ?, ?);";
            const uuid = v1();

            db.query(query, [uuid, historyInfo.year, historyInfo.month, historyInfo.description], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }
}

module.exports = HistoryStorage;