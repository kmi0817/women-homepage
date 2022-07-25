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

router.post("/create", async (req, res) => {
    if (req.query.bbs === "board") {
        const sql = `INSERT INTO board(title, writer, description) VALUES('${sanitizeHtml(req.body.title)}', '${sanitizeHtml(req.body.writer)}', '${sanitizeHtml(req.body.description)}')`;
        connection.query(sql, (err, ret, fields) => {
            if (err) {
                throw err;
            } else {
                console.log("** a posting in board has been saved in DB");
                res.redirect("/bbs");
            }
        })
    }
});

module.exports = router;