"use strict";

const db = require("../../config/db");

class CounselCommentStorage {

    static async save(cmntInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO counsel_comment(id, writer, description, posting_id) VALUES(?, ?, ?, ?);";
            db.query(query, [cmntInfo.id, cmntInfo.writer, cmntInfo.description, cmntInfo.posting_id], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }
}

module.exports = CounselCommentStorage;