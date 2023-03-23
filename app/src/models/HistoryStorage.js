"use strict";

const { v1 } = require("uuid");

const db = require("../config/db");

class HistoryStorage {

    static async save(historyInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO history(uuid, year, month, description) VALUES(?, ?, ?, ?);";
            const uuid = v1();

            db.query(query, [uuid, historyInfo.year, historyInfo.month, historyInfo.description], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }

    static async update(historyInfo) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE history SET year=?, month=?, description=? WHERE uuid=?;";

            db.query(query, [historyInfo.year, historyInfo.month, historyInfo.description, historyInfo.uuid], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }

    static async delete(historyInfo) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM history WHERE uuid=?;";

            db.query(query, [historyInfo.uuid], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }
}

module.exports = HistoryStorage;