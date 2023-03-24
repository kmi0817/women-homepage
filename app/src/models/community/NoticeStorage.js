"use strict";

const { v4 } = require("uuid");
const db = require("../../config/db");

class NoticeStorage {

    static async getNotices(pageNo) {
        return new Promise((resolve, reject) => {
            const startNo = (pageNo - 1) * 10; // 해당 pageNo에서의 startNo
            const query = `SELECT id, created_at, title, writer
            FROM notice
            WHERE is_deleted=0
            ORDER BY created_at DESC
            LIMIT ${startNo}, 10;`;
            // startNo번째부터 10개의 레코드를 가져온다.
            db.query(query, (err, data) => {
                if (err) reject(`${err}`);
                else resolve({ success: true, data: data });
            });
        });
    }

    static async getNotice(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM notice WHERE id=? and is_deleted=0;";
            db.query(query, [id], (err, data) => {
                if (err) reject(`${err}`);
                else {
                    if (!data.length) resolve({ success: false, err: "id doesn't exist in notice" });
                    else resolve({ success: true, data: data });
                }
            });
        });
    }

    static async save(noticeInfo) {
        return new Promise((resolve, reject) => {
            const id = v4();
            if (noticeInfo["originalname"]) {
                const query = "INSERT INTO notice(id, title, writer, description, originalname, filename) VALUES(?, ?, ?, ?, ?, ?);";
                db.query(query, [id, noticeInfo.title, noticeInfo.writer, noticeInfo.description, noticeInfo.originalname, noticeInfo.filename], (err) => {
                    if (err) reject(`${err}`);
                    else resolve({ success: true });
                });
            } else {
                const query = "INSERT INTO notice(id, title, writer, description) VALUES(?, ?, ?, ?);";
                db.query(query, [id, noticeInfo.title, noticeInfo.writer, noticeInfo.description], (err) => {
                    if (err) reject(`${err}`);
                    else resolve({ success: true });
                });
            }
        });
    }

    static async delete(noticeInfo) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE notice SET is_deleted=1 WHERE id=?;";
            db.query(query, [noticeInfo.id], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }
}

module.exports = NoticeStorage;