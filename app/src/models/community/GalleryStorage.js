"use strict";

const db = require("../../config/db");

class GalleryStorage {

    static async getGalleriesByTitle(galleryInfo) {
        return new Promise((resolve, reject) => {
            const keyword = `%${galleryInfo.keyword}%`;
            const query = "SELECT id, created_at, title, writer FROM gallery WHERE is_deleted=0 and title LIKE ? ORDER BY created_at DESC LIMIT ?, 10;";
            db.query(query, [keyword, galleryInfo.startNo], (err, data) => {
                if (err) reject(`${err}`);
                else resolve({ success: true, data: data });
            });
        });
    }

    static async getGalleriesByWriter(galleryInfo) {
        return new Promise((resolve, reject) => {
            const keyword = `%${galleryInfo.keyword}%`;
            const query = "SELECT id, created_at, title, writer FROM gallery WHERE is_deleted=0 and writer LIKE ? ORDER BY created_at DESC LIMIT ?, 10;";
            db.query(query, [keyword, galleryInfo.startNo], (err, data) => {
                if (err) reject(`${err}`);
                else resolve({ success: true, data: data });
            });
        });
    }

    static async getGalleriesByDesc(galleryInfo) {
        return new Promise((resolve, reject) => {
            const keyword = `%${galleryInfo.keyword}%`;
            const query = "SELECT id, created_at, title, writer FROM gallery WHERE is_deleted=0 and description LIKE ? ORDER BY created_at DESC LIMIT ?, 10;";
            db.query(query, [keyword, galleryInfo.startNo], (err, data) => {
                if (err) reject(`${err}`);
                else resolve({ success: true, data: data });
            });
        });
    }

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
                    if (!data.length) resolve({ success: false });
                    else resolve(data[0]);
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