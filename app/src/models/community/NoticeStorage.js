"use strict";

const { v4 } = require("uuid");
const db = require("../../config/db");

class NoticeStorage {

    static async getNotices(noticeInfo) {
        return new Promise((resolve, reject) => {
            const startNo = (noticeInfo.pageNo - 1) * 10; // 해당 pageNo에서의 startNo
            const query = "SELECT id, created_at, title, writer FROM notice WHERE is_deleted=? ORDER BY created_at DESC LIMIT ?, ?;"; // startNo번째부터 10개의 레코드를 가져온다.
            db.query(query, [0, startNo, 10], (err, data) => {
                if (err) reject(`${err}`);
                else resolve({ success: true, data: data });
            });
        });
    }

    static async getNotice(noticeInfo) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM notice WHERE id=? and is_deleted=?;";
            db.query(query, [noticeInfo.id, 0], (err, data) => {
                if (err) reject(`${err}`);
                else {
                    if (!data.length) resolve({ success: false, err: `Error: ER_NO_SUCH_COLUMN_VALUE: ${noticeInfo.id} doesn't exist in 'women.notice.id'` });
                    else resolve({ success: true, data: data });
                }
            });
        });
    }

    static async save(noticeInfo) {
        return new Promise((resolve, reject) => {
            const id = v4();
            const query = "INSERT INTO notice(id, title, writer, description, originalname, filename) VALUES(?, ?, ?, ?, ?, ?);";
            db.query(query, [id, noticeInfo.title, noticeInfo.writer, noticeInfo.description, noticeInfo.originalname, noticeInfo.filename], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }

    static async update(noticeInfo) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE notice SET title=?, description=?, originalname=?, filename=? WHERE id=? and is_deleted=?;";
            db.query(query, [noticeInfo.title, noticeInfo.description, noticeInfo.originalname, noticeInfo.filename, noticeInfo.id, 0], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }

    static async delete(noticeInfo) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE notice SET is_deleted=? WHERE id=?;";
            db.query(query, [1, noticeInfo.id], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }
}

module.exports = NoticeStorage;