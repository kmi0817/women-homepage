"use strict";

const { v4 } = require("uuid");
const db = require("../../config/db");

class FacilityStorage {

    static async getFacilities(facilityInfo) {
        return new Promise((resolve, reject) => {
            const startNo = (facilityInfo.pageNo - 1) * 10; // 해당 pageNo에서의 startNo
            const query = "SELECT id, created_at, title, writer, filename FROM facility WHERE is_deleted=? ORDER BY created_at DESC LIMIT ?, ?;"; // startNo번째부터 10개의 레코드를 가져온다.
            db.query(query, [0, startNo, 10], (err, data) => {
                if (err) reject(`${err}`);
                else resolve({ success: true, data: data });
            });
        });
    }

    static async save(facilityInfo) {
        return new Promise((resolve, reject) => {
            const id = v4();
            const query = "INSERT INTO facility(id, title, writer, originalname, filename) VALUES(?, ?, ?, ?, ?);";
            db.query(query, [id, facilityInfo.title, facilityInfo.writer, facilityInfo.originalname, facilityInfo.filename], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }

    static async update(facilityInfo) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE facility SET title=?, originalname=?, filename=? WHERE id=? and is_deleted=?;";
            db.query(query, [facilityInfo.title, facilityInfo.originalname, facilityInfo.filename, facilityInfo.id, 0], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }

    static async delete(facilityInfo) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE facility SET is_deleted=? WHERE id=?;";
            db.query(query, [1, facilityInfo.id], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }
}

module.exports = FacilityStorage;