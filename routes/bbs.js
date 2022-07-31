const express = require("express");
const router = express.Router();
const sanitizeHtml = require("sanitize-html");

// database
const mysql = require("mysql");
const config = require("../config.js");
const connection = mysql.createConnection(config);

/* 게시판 메인화면 겸 공지사항 페이지 */
router.get("/", async (req, res) => {
    const sql = `SELECT * FROM bbs WHERE bbs='board'`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

/* 시설 이미지 */
router.get("/images", async (req, res) => {
    const sql = `SELECT * FROM bbs WHERE bbs='images'`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

/* 자유 게시판 */
router.get("/community", async (req, res) => {
    const sql = `SELECT * FROM bbs WHERE bbs='community'`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

/* 포토 갤러리 */
router.get("/gallery", async (req, res) => {
    const sql = `SELECT * FROM bbs WHERE bbs='gallery'`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

module.exports = router;