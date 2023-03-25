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

    static async getCounsel(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM counsel WHERE id=? and is_deleted=0;";
            db.query(query, [id], (err, data) => {
                if (err) reject(`${err}`);
                else resolve(data[0]);
            });
        });
    }

    static async save(cInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO counsel(id, title, writer, description, password, originalname, filename) VALUES(?, ?, ?, ?, ?, ?, ?);";
            db.query(
                query,
                [
                    cInfo.id, cInfo.title, cInfo.writer, cInfo.description, cInfo.password, cInfo.originalname, cInfo.filename
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