"use strict";

const db = require("../../config/db");

class GalleryStorage {

    static async getGalleries(startNo) {
        return new Promise((resolve, reject) => {
            const query = "SELECT id, created_at, title, writer FROM gallery WHERE is_deleted=0 ORDER BY created_at DESC LIMIT ?, 10;"; // startNo번째부터 10개의 레코드를 가져온다.
            db.query(query, [startNo], (err, data) => {
                if (err) reject(`${err}`);
                else resolve({ success: true, data: data });
            });
        });
    }

    static async getGallery(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM gallery WHERE id=? and is_deleted=0;";
            db.query(query, [id], (err, data) => {
                if (err) reject(`${err}`);
                else {
                    if (!data.length) resolve({ success: false, err: `Error: ER_NO_SUCH_COLUMN_VALUE: ${id} doesn't exist in 'women.gallery.id'` });
                    else resolve({ success: true, data: data });
                }
            });
        });
    }

    static async save(galleryInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO gallery(id, title, writer, description, originalname, filename) VALUES(?, ?, ?, ?, ?, ?);";
            db.query(query, [galleryInfo.id, galleryInfo.title, galleryInfo.writer, galleryInfo.description, galleryInfo.originalname, galleryInfo.filename], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }

    static async update(galleryInfo) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE gallery SET title=?, description=?, originalname=?, filename=? WHERE id=? and is_deleted=0;";
            db.query(query, [galleryInfo.title, galleryInfo.description, galleryInfo.originalname, galleryInfo.filename, galleryInfo.id], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE gallery SET is_deleted=1 WHERE id=?;";
            db.query(query, [id], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }
}

module.exports = GalleryStorage;