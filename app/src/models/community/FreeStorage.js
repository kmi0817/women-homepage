"use strict";

const { v4 } = require("uuid");
const db = require("../../config/db");

class FreeStorage {

    static async getFrees(freeInfo) {
        return new Promise((resolve, reject) => {
            const startNo = (freeInfo.pageNo - 1) * 10; // 해당 pageNo에서의 startNo
            const query = "SELECT id, created_at, title, writer FROM free WHERE is_deleted=? ORDER BY created_at DESC LIMIT ?, ?;"; // startNo번째부터 10개의 레코드를 가져온다.
            db.query(query, [0, startNo, 10], (err, data) => {
                if (err) reject(`${err}`);
                else resolve({ success: true, data: data });
            });
        });
    }

    static async getFree(freeInfo) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM free WHERE id=? and is_deleted=?;";
            db.query(query, [freeInfo.id, 0], (err, data) => {
                if (err) reject(`${err}`);
                else {
                    if (!data.length) resolve({ success: false, err: `Error: ER_NO_SUCH_COLUMN_VALUE: ${freeInfo.id} doesn't exist in 'women.free.id'` });
                    else resolve({ success: true, data: data });
                }
            });
        });
    }

    static async save(freeInfo) {
        return new Promise((resolve, reject) => {
            const id = v4();
            const query = "INSERT INTO free(id, title, writer, description, originalname, filename) VALUES(?, ?, ?, ?, ?, ?);";
            db.query(query, [id, freeInfo.title, freeInfo.writer, freeInfo.description, freeInfo.originalname, freeInfo.filename], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }

    static async update(freeInfo) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE free SET title=?, description=?, originalname=?, filename=? WHERE id=? and is_deleted=?;";
            db.query(query, [freeInfo.title, freeInfo.description, freeInfo.originalname, freeInfo.filename, freeInfo.id, 0], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }

    static async delete(freeInfo) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE free SET is_deleted=? WHERE id=?;";
            db.query(query, [1, freeInfo.id], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }
}

module.exports = FreeStorage;