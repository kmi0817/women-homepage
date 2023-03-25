"use strict";

const { resolve } = require("path");
const db = require("../../config/db");

class CounselStorage {

    static async getCounsels(cInfo) {
        return new Promise((resolve, reject) => {
            const query = "SELECT id, created_at, title, writer FROM counsel WHERE is_deleted=0 ORDER BY created_at DESC LIMIT ?, 10;";
            db.query(query, [cInfo.startNo], (err, data) => {
                if (err) reject(`${err}`);
                else resolve({ success: true, data: data });
            });
        });
    }

    static async save(cInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO counsel(id, title, writer, description, salt, password, originalname, filename) VALUES(?, ?, ?, ?, ?, ?, ?, ?);";
            db.query(
                query,
                [
                    cInfo.id, cInfo.title, cInfo.writer, cInfo.description, cInfo.salt, cInfo.password, cInfo.originalname, cInfo.filename
                ],
                (err) => {
                    if (err) reject(`${err}`);
                    else resolve({ success: true });
                }
            );
        });
    }
}

module.exports = CounselStorage;