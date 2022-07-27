const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const sanitizeHtml = require("sanitize-html");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "women"
});

connection.connect((err) => {
    if (err) {
        console.error("mysql connection error");
        console.log(err);
        throw err;
    } else {
        console.log("DB OK");
    }
});
router.get("/", async (req, res) => {
    res.send("게시판 메인화면 겸 공지사항 페이지");
});

router.get("/images", async (req, res) => {
    res.send("시설 이미지");
});

router.get("/community", async (req, res) => {
    res.send("자유 게시판");
});

router.get("/gallery", async (req, res) => {
    res.send("포토 갤러리");
});

module.exports = router;