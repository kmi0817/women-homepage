"use strict";

const { v4 } = require("uuid");
const db = require("../../config/db");

class GalleryStorage {

    static async getGalleries(galleryInfo) {
        return new Promise((resolve, reject) => {
            const startNo = (galleryInfo.pageNo - 1) * 10; // 해당 pageNo에서의 startNo
            const query = "SELECT id, created_at, title, writer FROM gallery WHERE is_deleted=? ORDER BY created_at DESC LIMIT ?, ?;"; // startNo번째부터 10개의 레코드를 가져온다.
            db.query(query, [0, startNo, 10], (err, data) => {
                if (err) reject(`${err}`);
                else resolve({ success: true, data: data });
            });
        });
    }

    static async getGallery(galleryInfo) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM gallery WHERE id=? and is_deleted=?;";
            db.query(query, [galleryInfo.id, 0], (err, data) => {
                if (err) reject(`${err}`);
                else {
                    if (!data.length) resolve({ success: false, err: `Error: ER_NO_SUCH_COLUMN_VALUE: ${galleryInfo.id} doesn't exist in 'women.gallery.id'` });
                    else resolve({ success: true, data: data });
                }
            });
        });
    }

    static async save(galleryInfo) {
        return new Promise((resolve, reject) => {
            const id = v4();
            const query = "INSERT INTO gallery(id, title, writer, description, originalname, filename) VALUES(?, ?, ?, ?, ?, ?);";
            db.query(query, [id, galleryInfo.title, galleryInfo.writer, galleryInfo.description, galleryInfo.originalname, galleryInfo.filename], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }

    static async update(galleryInfo) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE gallery SET title=?, description=?, originalname=?, filename=? WHERE id=? and is_deleted=?;";
            db.query(query, [galleryInfo.title, galleryInfo.description, galleryInfo.originalname, galleryInfo.filename, galleryInfo.id, 0], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }

    static async delete(galleryInfo) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE gallery SET is_deleted=? WHERE id=?;";
            db.query(query, [1, galleryInfo.id], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }
}

module.exports = GalleryStorage;