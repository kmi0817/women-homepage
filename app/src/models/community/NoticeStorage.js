"use strict";

const { v4 } = require("uuid");
const db = require("../../config/db");

class NoticeStorage {

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
    
}

module.exports = NoticeStorage;