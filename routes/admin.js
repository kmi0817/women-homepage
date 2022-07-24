const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const sanitizeHtml = require("sanitize-html");
const crypto = require("crypto");

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

// 대시보드
router.get("/", async (req, res) => {
    res.render("index");
});

// 회원 관리
router.get("/users", async (req, res) => {
    const sql = `SELECT no, name, id, created_at FROM users`;
    connection.query(sql, (err, ret, fields) => {
        if (err) throw err;
        res.render("users", { users: ret});
    });
});

// 후원 신청 현황
router.get("/sponsorship", async (req, res) => {
    res.render("sponsorship");
});

// 자원봉사 신청 현황
router.get("/volunteerwork", async (req, res) => {
    res.render("volunteerwork");
});

// 비밀상담 관리
router.get("/counsel", async (req, res) => {
    res.render("counsel");
});

// 공지사항 관리
router.get("/board", async (req, res) => {
    res.render("board");
});

// 시설 이미지 관리
router.get("/images", async (req, res) => {
    res.render("images");
});

// 자유 게시판 관리
router.get("/community", async (req, res) => {
    res.render("community");
});

// 포토 갤러리 관리
router.get("/gallery", async (req, res) => {
    res.render("gallery");
});

// 회원 등록
router.post("/register", async (req, res) => {
    const name = sanitizeHtml(req.body.name);
    const id = sanitizeHtml(req.body.id);
    const salt = crypto.randomBytes(64).toString("base64");
    const password = crypto.pbkdf2Sync(sanitizeHtml(req.body.password), salt, 198922, 64, "sha512").toString("base64");

    const sql = `INSERT INTO users(name, id, password, salt) VALUES('${name}', '${id}', '${password}', '${salt}')`;
    connection.query(sql, (err, ret, fields) => {
        if (err) throw err;
        console.log(ret);
    });

    res.redirect("/admin/users");
});

module.exports = router;