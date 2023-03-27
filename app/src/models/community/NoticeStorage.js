"use strict";

const db = require("../../config/db");

class NoticeStorage {

    static async getNoticesByTitle(noticeInfo) {
        return new Promise((resolve, reject) => {
            const keyword = `%${noticeInfo.keyword}%`;
            const query = "SELECT id, created_at, title, writer FROM notice WHERE is_deleted=0 and title LIKE ? ORDER BY created_at DESC LIMIT ?, 10;";
            db.query(query, [keyword, noticeInfo.startNo], (err, data) => {
                if (err) reject(`${err}`);
                else resolve({ success: true, data: data });
            });
        });
    }

    static async getNoticesByWriter(noticeInfo) {
        return new Promise((resolve, reject) => {
            const keyword = `%${noticeInfo.keyword}%`;
            const query = "SELECT id, created_at, title, writer FROM notice WHERE is_deleted=0 and writer LIKE ? ORDER BY created_at DESC LIMIT ?, 10;";
            db.query(query, [keyword, noticeInfo.startNo], (err, data) => {
                if (err) reject(`${err}`);
                else resolve({ success: true, data: data });
            });
        });
    }

    static async getNoticesByDesc(noticeInfo) {
        return new Promise((resolve, reject) => {
            const keyword = `%${noticeInfo.keyword}%`;
            const query = "SELECT id, created_at, title, writer FROM notice WHERE is_deleted=0 and description LIKE ? ORDER BY created_at DESC LIMIT ?, 10;";
            db.query(query, [keyword, noticeInfo.startNo], (err, data) => {
                if (err) reject(`${err}`);
                else resolve({ success: true, data: data });
            });
        });
    }

    static async getNotices(startNo) {
        return new Promise((resolve, reject) => {
            const query = "SELECT id, created_at, title, writer FROM notice WHERE is_deleted=0 ORDER BY created_at DESC LIMIT ?, 10;"; // startNo번째부터 10개의 레코드를 가져온다.
            db.query(query, [startNo], (err, data) => {
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
                    if (!data.length) resolve({ success: false });
                    else resolve(data[0]);
                }
            });
        });
    }

    static async save(noticeInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO notice(id, title, writer, description, originalname, filename) VALUES(?, ?, ?, ?, ?, ?);";
            db.query(query, [noticeInfo.id, noticeInfo.title, noticeInfo.writer, noticeInfo.description, noticeInfo.originalname, noticeInfo.filename], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }

    static async update(noticeInfo) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE notice SET title=?, description=?, originalname=?, filename=? WHERE id=? and is_deleted=0;";
            db.query(query, [noticeInfo.title, noticeInfo.description, noticeInfo.originalname, noticeInfo.filename, noticeInfo.id], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE notice SET is_deleted=1 WHERE id=?;";
            db.query(query, [id], (err) => {
                if (err) reject(`${err}`);
                else resolve({ success: true });
            });
        });
    }
}

module.exports = NoticeStorage;