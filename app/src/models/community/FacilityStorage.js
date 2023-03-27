"use strict";

const db = require("../../config/db");

class FacilityStorage {

    static async getFacilitiesByTitle(facilityInfo) {
        return new Promise((resolve, reject) => {
            const keyword = `%${facilityInfo.keyword}%`;
            const query = "SELECT id, created_at, title, writer FROM facility WHERE is_deleted=0 and title LIKE ? ORDER BY created_at DESC LIMIT ?, 10;";
            db.query(query, [keyword, facilityInfo.startNo], (err, data) => {
                if (err) reject(`${err}`);
                else resolve({ success: true, data: data });
            });
        });
    }

    static async getFacilitiesByWriter(facilityInfo) {
        return new Promise((resolve, reject) => {
            const keyword = `%${facilityInfo.keyword}%`;
            const query = "SELECT id, created_at, title, writer FROM facility WHERE is_deleted=0 and writer LIKE ? ORDER BY created_at DESC LIMIT ?, 10;";
            db.query(query, [keyword, facilityInfo.startNo], (err, data) => {
                if (err) reject(`${err}`);
                else resolve({ success: true, data: data });
            });
        });
    }

    static async getFacilities(startNo) {
        return new Promise((resolve, reject) => {
            const query = "SELECT id, created_at, title, writer, filename FROM facility WHERE is_deleted=0 ORDER BY created_at DESC LIMIT ?, 10;"; // startNo번째부터 10개의 레코드를 가져온다.
            db.query(query, [startNo], (err, data) => {
                if (err) reject(`${err}`);
                else resolve({ success: true, data: data });
            });
        });
    }

    static async getFacility(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM facility WHERE id=? and is_deleted=0;";
            db.query(query, [id], (err, data) => {
                if (err) reject(`${err}`);
                else {
                    if (!data.length) resolve({ success: false });
                    else resolve(data[0]);
                }
            });
        });
    }

    static async save(facilityInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO facility(id, title, writer, originalname, filename) VALUES(?, ?, ?, ?, ?);";
            db.query(query, [facilityInfo.id, facilityInfo.title, facilityInfo.writer, facilityInfo.originalname, facilityInfo.filename], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }

    static async update(facilityInfo) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE facility SET title=?, originalname=?, filename=? WHERE id=? and is_deleted=0;";
            db.query(query, [facilityInfo.title, facilityInfo.originalname, facilityInfo.filename, facilityInfo.id], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE facility SET is_deleted=1 WHERE id=?;";
            db.query(query, [id], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }
}

module.exports = FacilityStorage;