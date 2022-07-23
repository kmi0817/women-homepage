const express = require("express");
const router = express.Router();

// 대시보드
router.get("/", async (req, res) => {
    res.render("index.html");
});

// 회원 관리
router.get("/users", async (req, res) => {
    res.render("users.html");
});

// 후원 신청 현황
router.get("/sponsorship", async (req, res) => {
    res.render("users.html");
});

// 자원봉사 신청 현황
router.get("/volunteerwork", async (req, res) => {
    res.render("users.html");
});

// 비밀상담 관리
router.get("/counsel", async (req, res) => {
    res.render(".html");
});

// 공지사항 관리
router.get("/board", async (req, res) => {
    res.render(".html");
});

// 시설 이미지 관리
router.get("/images", async (req, res) => {
    res.render(".html");
});

// 자유 게시판 관리
router.get("/community", async (req, res) => {
    res.render(".html");
});

// 포토 갤러리 관리
router.get("/gallery", async (req, res) => {
    res.render(".html");
});

module.exports = router;