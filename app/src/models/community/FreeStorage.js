"use strict";

const db = require("../../config/db");

class FreeStorage {

    static async getFrees(startNo) {
        return new Promise((resolve, reject) => {
            const query = "SELECT id, created_at, title, writer FROM free WHERE is_deleted=0 ORDER BY created_at DESC LIMIT ?, 10;"; // startNo번째부터 10개의 레코드를 가져온다.
            db.query(query, [startNo], (err, data) => {
                if (err) reject(`${err}`);
                else resolve({ success: true, data: data });
            });
        });
    }

    static async getFree(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM free WHERE id=? and is_deleted=0;";
            db.query(query, [id], (err, data) => {
                if (err) reject(`${err}`);
                else {
                    if (!data.length) resolve({ success: false, err: `Error: ER_NO_SUCH_COLUMN_VALUE: ${id} doesn't exist in 'women.free.id'` });
                    else resolve({ success: true, data: data });
                }
            });
        });
    }

    static async save(freeInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO free(id, title, writer, description, originalname, filename) VALUES(?, ?, ?, ?, ?, ?);";
            db.query(query, [freeInfo.id, freeInfo.title, freeInfo.writer, freeInfo.description, freeInfo.originalname, freeInfo.filename], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }

    static async update(freeInfo) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE free SET title=?, description=?, originalname=?, filename=? WHERE id=? and is_deleted=0;";
            db.query(query, [freeInfo.title, freeInfo.description, freeInfo.originalname, freeInfo.filename, freeInfo.id], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE free SET is_deleted=1 WHERE id=?;";
            db.query(query, [id], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }
}

module.exports = FreeStorage;