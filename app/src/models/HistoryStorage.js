"use strict";

const { v1 } = require("uuid");

const db = require("../config/db");

class HistoryStorage {

    static async getHistories() {
        return new Promise((resolve, reject) => {
            const query = "SELECT year, description FROM history ORDER BY year, month;";
            db.query(query, (err, data) => {
                if (err) reject(`${err}`);
                else resolve(data);
            });
        });
    }

    static async save(historyInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO history(id, year, month, description) VALUES(?, ?, ?, ?);";
            const id = v1();

            db.query(query, [id, historyInfo.year, historyInfo.month, historyInfo.description], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }

    static async update(historyInfo) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE history SET year=?, month=?, description=? WHERE id=?;";

            db.query(query, [historyInfo.year, historyInfo.month, historyInfo.description, historyInfo.id], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }

    static async delete(historyInfo) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM history WHERE id=?;";

            db.query(query, [historyInfo.id], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }
}

module.exports = HistoryStorage;